import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { toast } from "react-hot-toast";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function TaskModal({ createTask, column }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const titleRef = React.useRef("");
  const descriptionRef = React.useRef("");
  const priorityRef = React.useRef("");
  const timeRef = React.useRef("");

  const submitForm = (event) => {
    event.preventDefault();

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const priority = priorityRef.current.value;
    const date = timeRef.current.value;

    if (title === "" || description === "" || priority === "" || date === "") {
      toast.error("Please fill up the input");
      return;
    }

    const newTask = {
    
      title: title,
      description: description,
      priority: priority,
      date: date,
      column: "Todo",
      columnId: column.id,
    };

    createTask(column, newTask);
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" className="w-full">
        Add task
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="flex flex-col gap-4">
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            inputRef={titleRef}
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={4}
            inputRef={descriptionRef}
          />
          <input type="date" ref={timeRef} />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Priority"
              onChange={handleChange}
              inputRef={priorityRef}
            >
              <MenuItem value={"low"}>Low</MenuItem>
              <MenuItem value={"moderate"}>Moderate</MenuItem>
              <MenuItem value={"high"}>High</MenuItem>
            </Select>
          </FormControl>

          <Button onClick={submitForm} variant="contained">
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
