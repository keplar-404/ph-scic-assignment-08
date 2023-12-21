import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export default function Task() {
  return (
    <div className="w-[20rem]">
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
              <p>Title</p>

              <Chip label="Priority" color="success" />
            </div>
          </AccordionSummary>
        </div>
        <AccordionDetails>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </p>
          <p>Deadline: 21/8/2023</p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
