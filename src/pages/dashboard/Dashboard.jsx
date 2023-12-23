import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import RedirectUser from "../../components/RedirectUser";
import { UserContext } from "../../components/AuthContextWraper";
import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";

function KanbanBoard() {
  const [columns, setColumns] = useState([
    {
      id: 1,
      title: "Todo",
    },
    {
      id: 2,
      title: "Ongoing",
    },
    {
      id: 3,
      title: "Completed",
    },
  ]);
  const { userData, setUserData } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    const tasksData =
      JSON.parse(window.localStorage.getItem("tasksData")) || [];
    setTasks(tasksData);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 16,
      },
    })
  );

  if (userData === "loading") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <RedirectUser>
      <div
        className="w-full  flex justify-center items-center mt-[6rem] mb-[10rem]"
      >
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
        >
          {/* <div className=""> */}
            <div className="flex sm:flex-col lg:flex-row justify-center items-center w-full gap-8">
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                  setTasks={setTasks}
                />
              ))}
            </div>
          {/* </div> */}

          {createPortal(
            <DragOverlay>
              {activeTask && <TaskCard task={activeTask} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </RedirectUser>
  );

  function createTask(column, _newTask) {

    const newTask = {
      id: generateId(),
      columnId: column.id,
      data: _newTask,
    };
    const newGeneratedTasks = [...tasks, newTask];
    window.localStorage.setItem("tasksData", JSON.stringify(newGeneratedTasks));
    setTasks(newGeneratedTasks);
  }

  function deleteTask(id) {
    const filteredTasks = tasks.filter((data) => data.id !== id);
    window.localStorage.setItem("tasksData", JSON.stringify(filteredTasks));
    setTasks(filteredTasks);
    toast.success("Successfully task deleted")
  }

  function onDragStart(event) {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;

          const newCreatedTasksArray = arrayMove(
            tasks,
            activeIndex,
            overIndex - 1
          );
          window.localStorage.setItem(
            "tasksData",
            JSON.stringify(newCreatedTasksArray)
          );
          return newCreatedTasksArray;
        }

        const newCreatedTasksArray = arrayMove(tasks, activeIndex, overIndex);
        window.localStorage.setItem(
          "tasksData",
          JSON.stringify(newCreatedTasksArray)
        );
        return newCreatedTasksArray;
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;

        const newCreatedTasksArray = arrayMove(tasks, activeIndex, activeIndex);
        window.localStorage.setItem(
          "tasksData",
          JSON.stringify(newCreatedTasksArray)
        );
        return newCreatedTasksArray;
      });
    }
  }
}

function generateId() {
  return Math.floor(Math.random() * 100000001);
}

export default KanbanBoard;
