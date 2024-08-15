class Tasks {
  constructor(title, description, status, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.dueDate = new Date(dueDate);
    this.priority = priority;
  }

  updateStatus(newStatus) {
    this.status = newStatus;
  }

  isOverdue() {
    const today = new Date();
    return this.dueDate < today && this.status !== "completed";
  }
}

const tasks = [];

function addtask() {
  const title = document.getElementById("task-title").value.trim();
  const description = document.getElementById("task-description").value.trim();
  const status = document.getElementById("task-status").value;
  const dueDate = document.getElementById("task-dueDate").value;
  const priority = document.getElementById("task-Priority").value;

  if (title && description && dueDate) {
    const task = new Tasks(title, description, status, dueDate, priority);
    tasks.push(task);
    displayTasks();
  } else {
    alert("Please enter valid data.");
  }
}


function deleteTask(index){
  tasks.splice(index,1)
  displayTasks();
}
function updateTaskStatus(index, newStatus) {
  tasks[index].updateStatus(newStatus);
  displayTasks();
}



function displayTasks() {
  const taskContainer = document.getElementById("tasks");
  taskContainer.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task-item";

    if (task.priority === "high") {
      taskDiv.style.borderLeft = "4px solid red";
    } else if (task.priority === "medium") {
      taskDiv.style.borderLeft = "4px solid orange";
    } else {
      taskDiv.style.borderLeft = "4px solid green";
    }

    // if (task.isOverdue()) {
    //   taskDiv.style.backgroundColor = "lightcoral";
    // }

    taskDiv.innerHTML = `
      <span>${task.title}</span>
      <span>${task.description}</span>
      <span>${task.status}</span>
      <span>${task.dueDate.toDateString()}</span>
      <select onchange="updateTaskStatus(${index}, this.value)">
        <option value="pending" ${
          task.status === "pending" ? "selected" : ""
        }>Pending</option>
        <option value="in progress" ${
          task.status === "in progress" ? "selected" : ""
        }>In Progress</option>
        <option value="completed" ${
          task.status === "completed" ? "selected" : ""
        }>Completed</option>
      </select>
      <button onclick="deleteTask(${index})">Delete</button>
`;

    taskContainer.appendChild(taskDiv);
  });
}
