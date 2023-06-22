const init = () => {
  document.querySelector("#newTask").addEventListener("click", addNewTask);
  getAllTasks();
};

const addNewTask = () => {
  const taskDescription = document.querySelector("#task").value;
  const params = {
    name: taskDescription
  };

  const taskDiv = createTaskElement(taskDescription);
  document.getElementById("taskList").appendChild(taskDiv);

  const xhr = new XMLHttpRequest();
  const url = "http://localhost:3000/api/tasks";

  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("New record was added.");
      const response = JSON.parse(xhr.responseText);
      updateTaskList(response, taskDiv);
    }
  };
  xhr.send(JSON.stringify(params));
};

const getAllTasks = () => {
  const xhr = new XMLHttpRequest();
  const url = "http://localhost:3000/api/tasks";

  xhr.open("GET", url);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      console.log(response);
      updateTaskList(response);
    }
  };
  xhr.send();
};

const deleteTask = (taskId, taskDiv) => {
  const xhr = new XMLHttpRequest();
  const url = `http://localhost:3000/api/tasks/${taskId}`;

  xhr.open("DELETE", url);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(`${taskId} was deleted.`);
      taskDiv.remove();
    }
  };
  xhr.send();
};

const updateTaskList = (response, addedTaskDiv = null) => {
  if (Array.isArray(response)) {
    const tasks = response;

    const taskList = document.getElementById("taskList");

    if (!addedTaskDiv) {
      taskList.innerHTML = "";
    }

    tasks.forEach((task) => {
      const taskDiv = createTaskElement(task.name);

      const deleteButton = taskDiv.querySelector(".deleteButton");
      deleteButton.addEventListener("click", () => deleteTask(task.id, taskDiv));

      taskList.appendChild(taskDiv);
    });
  }
};

const createTaskElement = (taskDescription) => {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteButton");

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-trash-alt");

  deleteButton.appendChild(deleteIcon);

  const descriptionSpan = document.createElement("span");
  descriptionSpan.classList.add("taskDescription");
  descriptionSpan.textContent = taskDescription;

  taskDiv.appendChild(deleteButton);
  taskDiv.appendChild(descriptionSpan);

  return taskDiv;
};

window.onload = () => {
  init();
};