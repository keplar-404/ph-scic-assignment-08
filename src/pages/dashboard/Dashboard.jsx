import React from "react";
import TaskColoumn from "./TaskColoumn";
import { Button } from "@mui/material";
import TaskModal from "./Modal";

export default function Dashboard() {
  return (
    <>
      <div className="w-full h-screen flex flex-col gap-4 justify-center items-center bg-[#f9fbfd]">
     <TaskModal/>

        <div className="flex flex-row gap-8 justify-center items-center">
          <TaskColoumn columnName={"Todo"} />
          <TaskColoumn columnName={"Ongoing"} />
          <TaskColoumn columnName={"Completed"} />
        </div>
      </div>
    </>
  );
}
