import React from "react";
import Task from "./Task";

export default function TaskColoumn({ columnName }) {
  return (
    <>
      <div className=" w-[22rem] h-[30rem] rounded-lg bg-white shadow-lg">
        <p className="font-semibold text-xl text-center py-[1rem]">{columnName}</p>

        <div className="h-full w-full bg-slate-200 rounded-b-lg flex flex-col gap-4 overflow-y-scroll items-center pt-4">
          <Task />
        </div>
      </div>
    </>
  );
}
