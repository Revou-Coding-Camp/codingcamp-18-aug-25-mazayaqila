let tasks = [];

function addTask() {
  const taskInput = document.getElementById("task-input").value.trim();
  const dueDate = document.getElementById("due-date").value;
  const category = document.getElementById("category-select").value;

  if (taskInput === "" || dueDate === "") {
    alert("Please fill in all fields!");
    return;
  }

  const newTask = {
    id: Date.now(),
    name: taskInput,
    due: dueDate,
    category: category,
    done: false,
  };

  tasks.push(newTask);
  document.getElementById("new-task-form").reset();
  renderTasks();
}

function toggleDone(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task
  );
  renderTasks();
}

function deleteAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    renderTasks();
  }
}

function applyFilters() {
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  const categoryFilter = document.getElementById("filter-category").value;
  const statusFilter = document.getElementById("filter-status").value;

  let filteredTasks = tasks;

  if (categoryFilter !== "all") {
    filteredTasks = filteredTasks.filter(
      (task) => task.category === categoryFilter
    );
  }

  if (statusFilter === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.done);
  } else if (statusFilter === "pending") {
    filteredTasks = filteredTasks.filter((task) => !task.done);
  }

  filteredTasks.forEach((task) => {
    const row = document.createElement("tr");

    const taskCell = document.createElement("td");
    taskCell.textContent = task.name;
    if (task.done) taskCell.classList.add("completed");

    const dueCell = document.createElement("td");
    dueCell.textContent = task.due;

    const categoryCell = document.createElement("td");
    categoryCell.textContent = task.category;

    const statusCell = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.onclick = () => toggleDone(task.id);
    statusCell.appendChild(checkbox);

    row.appendChild(taskCell);
    row.appendChild(dueCell);
    row.appendChild(categoryCell);
    row.appendChild(statusCell);

    taskList.appendChild(row);
  });
}
