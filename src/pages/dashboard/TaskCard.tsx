import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import React from "react";

function TaskCard({ task }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 bg-mainBackgroundColor h-[60px] min-h-[60px] items-center flex rounded-lg border-2 border-black cursor-grab relative
      "
      ></div>
    );
  }

  return (
    <div
      className="w-[20rem]"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Accordion>
        <div className="flex w-full justify-center items-center">
          <DragIndicatorIcon className="cursor-pointer mt-[-3px] pl-[3px]" />

          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="w-full"
          >
            <div className="flex w-full justify-between">
              <p>{task.data.title}</p>

             
              {task.data.priority === "low" && (
                <p
                  className={`px-[13px] py-[4px] rounded-2xl bg-yellow-200 text-[13px]`}
                >
                  {task.data.priority}
                </p>
              )}
              {task.data.priority === "moderate" && (
                <p
                  className={`px-[13px] py-[4px] rounded-2xl bg-green-200 text-[13px]`}
                >
                  {task.data.priority}
                </p>
              )}
              {task.data.priority === "high" && (
                <p
                  className={`px-[13px] py-[4px] rounded-2xl bg-red-300 text-[13px]`}
                >
                  {task.data.priority}
                </p>
              )}
            </div>
          </AccordionSummary>
        </div>
        <AccordionDetails>
          <p>{task.data.description}</p>
          <p className="mt-[3rem]">
            <span className="font-bold">Deadline:</span> {task.data.date}
          </p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default TaskCard;
