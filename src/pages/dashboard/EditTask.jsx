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

// type and taskId optional
export default function EditTaskModal({ taskdata, setTasks }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [age, setAge] = React.useState(null);

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

    const localStorageTasksData = JSON.parse(
      window.localStorage.getItem("tasksData")
    );

    const newTasksDataForLocalStorage = localStorageTasksData.map((task) => {
      if (task.id === taskdata.id) {
        return {
          ...task,
          data: {
            title,
            description,
            priority,
            date,
          },
        };
      }
      return task;
    });

    window.localStorage.setItem(
      "tasksData",
      JSON.stringify(newTasksDataForLocalStorage)
    );

    setTasks((tasks) => {
      return tasks.map((data) => {
        if (data.id === taskdata.id) {
          data.data.title = title;
          data.data.description = description;
          data.data.priority = priority;
          data.data.date = date;
        }
        return data;
      });
    });

    handleClose();
    toast.success("Successfully task updated");
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" className="w-full">
        Edit task
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
            defaultValue={taskdata.data.title}
            inputRef={titleRef}
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={4}
            inputRef={descriptionRef}
            defaultValue={taskdata.data.description}
          />
          <input type="date" ref={timeRef} defaultValue={taskdata.data.date} />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age || taskdata.data.priority}
              label="Priority"
              onChange={handleChange}
              inputRef={priorityRef}
              defaultValue={taskdata.data.priority}
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
