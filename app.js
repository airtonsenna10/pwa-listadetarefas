let tarefas = [];

// Carregar tarefas e tema ao iniciar
window.addEventListener('load', () => {
  const salvas = localStorage.getItem('tarefas');
  if (salvas) tarefas = JSON.parse(salvas);
  renderizarTarefas();

  const modoEscuro = localStorage.getItem('modoEscuro') === 'true';
  if (modoEscuro) {
    document.body.classList.add('escuro');
  }
});

// Adiciona uma nova tarefa
function adicionarTarefa() {
  const input = document.getElementById('novaTarefa');
  const texto = input.value.trim();
  if (texto !== '') {
    tarefas.push({ texto });
    salvarTarefas();
    renderizarTarefas();
    input.value = '';
  }
}

// Salva tarefas no localStorage
function salvarTarefas() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Renderiza as tarefas na tela
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

// Edita uma tarefa
function editarTarefa(index) {
  const novoTexto = prompt('Edite a tarefa:', tarefas[index].texto);
  if (novoTexto !== null && novoTexto.trim() !== '') {
    tarefas[index].texto = novoTexto.trim();
    salvarTarefas();
    renderizarTarefas();
  }
}

// Remove uma tarefa
function removerTarefa(index) {
  tarefas.splice(index, 1);
  salvarTarefas();
  renderizarTarefas();
}

// Alternar tema claro/escuro
const btnTema = document.getElementById('toggleTema');
btnTema.addEventListener('click', () => {
  document.body.classList.toggle('escuro');
  const modoEscuro = document.body.classList.contains('escuro');
  localStorage.setItem('modoEscuro', modoEscuro);
});



