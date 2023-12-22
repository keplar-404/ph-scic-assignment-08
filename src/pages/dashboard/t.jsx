import React, { useState } from "react";
import TaskColoumn from "./TaskColoumn";
import { Button } from "@mui/material";
import TaskModal from "./Modal";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import Task from "./Task";

export default function Dashboard() {
  const [todoTasks, setTodoTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);

  const column = [
    {
      id: 1,
      name: "Todo",
    },
    {
      id: 2,
      name: "Ongoing",
    },
    {
      id: 3,
      name: "Completed",
    },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

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
      todoTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      todoTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  return (
    <>
      <div className="w-full h-screen flex flex-col gap-4 justify-center items-center bg-[#f9fbfd]">
        <TaskModal setTodoTasks={setTodoTasks} />
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
        >
          <div className="flex flex-row gap-8 justify-center items-center">
            {column.map((data, index) => (
              <TaskColoumn
                key={index}
                columnName={data.name}
                todoTasks={todoTasks.filter(
                  (task) => task.columnId === data.id
                )}
                column={data}
              />
            ))}
          </div>
          {createPortal(
          <DragOverlay>
            {activeTask && (
              <Task
                task={activeTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
        </DndContext>
      </div>
    </>
  );
}
