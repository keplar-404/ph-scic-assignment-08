import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Task({ task }) {
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
              <p>{task.title}</p>

              <Chip label="Priority" color="success" />
            </div>
          </AccordionSummary>
        </div>
        <AccordionDetails>
          <p>{task.description}</p>
          <p className="mt-[3rem]">
            <span className="font-bold">Deadline:</span> {task.deadline}
          </p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
