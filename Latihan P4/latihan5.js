let inputTask = document.createElement("input");
inputTask.type = "text";
inputTask.placeholder = "Masukkan tugas baru...";
inputTask.id = "task-input";
inputTask.className = "task-input";

let btnAdd = document.createElement("button");
btnAdd.textContent = "Tambah";
btnAdd.id = "add-task";
btnAdd.className = "add-task";

let taskList = document.createElement("ul");
taskList.id = "task-list";

taskList.className = "task-list";

btnAdd.addEventListener("click", function () {
  let taskText = inputTask.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    inputTask.value = "";
    inputTask.focus();
    saveTasks();
  }
});

function addTask(taskText) {
  let li = document.createElement("li");

  let taskLeft = document.createElement("div");
  taskLeft.className = "task-left";

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  let taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  checkbox.addEventListener("change", function () {
    taskSpan.style.textDecoration = this.checked ? "line-through" : "none";
    saveTasks();
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Hapus";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", function () {
    li.remove();
    saveTasks();
  });

  taskLeft.appendChild(checkbox);
  taskLeft.appendChild(taskSpan);

  li.appendChild(taskLeft);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#task-list li").forEach(function (li) {
    let taskText = li.querySelector("span").textContent;
    let isCompleted = li.querySelector("input[type='checkbox']").checked;
    tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    let tasks = JSON.parse(savedTasks);
    tasks.forEach(function (task) {
      addTask(task.text);
      let lastAdded = taskList.lastChild;
      let checkbox = lastAdded.querySelector("input[type='checkbox']");
      checkbox.checked = task.completed;
      if (task.completed) {
        lastAdded.querySelector("span").style.textDecoration = "line-through";
      }
    });
  }
}

let outputDiv = document.getElementById("output5");
if (outputDiv) {
  let row = document.createElement("div");
  row.className = "input-row";
  row.appendChild(inputTask);
  row.appendChild(btnAdd);

  outputDiv.appendChild(row);
  outputDiv.appendChild(taskList);

  loadTasks();
}