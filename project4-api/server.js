const express = require("express");
const app = express();
const fs = require("fs");
let tasks = require("./tasks.json");
app.use(express.json());

// Returns all tasks
app.get("/api/tasks/", (req, res) => {
  res.json(tasks);
});

// Returns specified task
app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (task) {
    res.json(task);
  } else {
    res.json({});
  }
});

// Adds a new task via POST
app.post("/api/tasks/", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    name: req.body.name,
  };
  for (let i = 0; i < tasks.length; i++) {
    while (tasks[i].id === newTask.id) {
      newTask.id++;
    }
  }
  tasks.push(newTask);
  const data = JSON.stringify(tasks);
  fs.writeFileSync("tasks.json", data);
  res.json(newTask);
});

// Removes a task
app.delete("/api/tasks/:id", (req, res) => {
  const taskToRemove = tasks.find((t) => t.id === parseInt(req.params.id));
  const index = tasks.indexOf(taskToRemove);
  tasks.splice(index, 1);
  const data = JSON.stringify(tasks);
  fs.writeFileSync("tasks.json", data);
  res.json(taskToRemove);
});

// Updates a task
app.put("/api/tasks/:id", (req, res) => {
  const taskToUpdate = tasks.find((t) => t.id === parseInt(req.params.id));
  taskToUpdate.name = req.body.name;
  const data = JSON.stringify(tasks);
  fs.writeFileSync("tasks.json", data);
  res.json(taskToUpdate);
});

// Start the server
app.listen(3000, () => {
  console.log("listening on port 3000");
});
