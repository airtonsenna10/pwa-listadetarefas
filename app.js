
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

function renderizarTarefas() {
  const lista = document.getElementById('listaTarefas');
  lista.innerHTML = '';

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement('li');
    li.textContent = tarefa.texto;

    // Botão Editar
    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.onclick = () => editarTarefa(index);

    // Botão Remover
    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.onclick = () => removerTarefa(index);

    li.appendChild(btnEditar);
    li.appendChild(btnRemover);
    lista.appendChild(li);
  });
}

function editarTarefa(index) {
  const novoTexto = prompt('Edite a tarefa:', tarefas[index].texto);
  if (novoTexto !== null && novoTexto.trim() !== '') {
    tarefas[index].texto = novoTexto.trim();
    salvarTarefas();
    renderizarTarefas();
  }
}

loadTasks();
