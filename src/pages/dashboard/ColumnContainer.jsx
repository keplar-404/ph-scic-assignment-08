import { SortableContext, useSortable } from "@dnd-kit/sortable";

import React, { useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import { Button } from "@mui/material";
import TaskModal from "./Modal";

function ColumnContainer({ column, createTask, deleteTask, tasks, setTasks }) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className=" bg-columnBackgroundColor w-[335px] h-[500px] max-h-[500px] rounded-md flex flex-col
  "
    >
      {/* Column title */}
      <div
        className=" bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between
      "
      >
        <div className="flex gap-2">
          <div
            className="bg-white flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full
        "
          >
            {column.title}
          </div>
        </div>
      </div>

      {/* Column task container */}
      <div className="bg-slate-200 flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} setTasks={setTasks}  deleteTask={deleteTask} />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}

      {column.title === "Todo" && (
        <>
          <TaskModal column={column} createTask={createTask}  />
        </>
      )}
    </div>
  );
}

export default ColumnContainer;
