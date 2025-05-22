
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function addTask() {
  if (taskInput.value.trim() === '') return;

  const li = document.createElement('li');
  li.textContent = taskInput.value;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = '';
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    tasks.push(li.firstChild.textContent);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.onclick = () => {
      li.remove();
      saveTasks();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

loadTasks();
