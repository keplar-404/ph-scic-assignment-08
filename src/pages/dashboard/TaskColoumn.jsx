import React, { useMemo } from "react";
import Task from "./Task";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

export default function TaskColoumn({ column, columnName, todoTasks }) {

  
  const tasksIds = useMemo(() => todoTasks.map((task) => task.id), [todoTasks]);
  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  return (
    <>
      <div ref={setNodeRef} className=" w-[22rem] h-[30rem] rounded-lg bg-white shadow-lg">
        <p className="font-semibold text-xl text-center py-[1rem]">
          {columnName}
        </p>

        <div className="h-full w-full bg-slate-200 rounded-b-lg flex flex-col gap-4 overflow-y-scroll items-center pt-4">
          <SortableContext items={tasksIds}>
            {todoTasks.map((data, index) => (
              <Task key={index} task={data} />
            ))}
          </SortableContext>
        </div>
      </div>
    </>
  );
}
