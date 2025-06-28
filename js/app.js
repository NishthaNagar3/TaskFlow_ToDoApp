const user = JSON.parse(localStorage.getItem('user'));
if (!user) window.location.href = 'index.html';

document.getElementById('username').innerText = user.name;
document.getElementById('avatar').src =
  `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(user.name)}`;

document.getElementById('signout').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = 'index.html';
});

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

if (tasks.length === 0) {
  fetch('https://dummyjson.com/todos')
    .then(res => res.json())
    .then(data => {
      tasks = data.todos.slice(0, 5).map(todo => ({
        id: Date.now() + Math.random(),
        title: todo.todo,
        stage: 'todo',
        lastModified: new Date().toLocaleString()
      }));
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    });
} else {
  renderTasks();
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;

  const newTask = {
    id: Date.now(),
    title,
    stage: 'todo',
    lastModified: new Date().toLocaleString()
  };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  taskInput.value = '';
  renderTasks();
});

function renderTasks() {
  ['todo', 'completed', 'archived'].forEach(stage => {
    const column = document.getElementById(`${stage}-column`);
    column.innerHTML = `<h3>${stage.charAt(0).toUpperCase() + stage.slice(1)}</h3>`;
    tasks.filter(task => task.stage === stage).forEach(task => {
      const div = document.createElement('div');
      div.className = 'task';
      div.innerHTML = `
        <p>${task.title}</p>
        <small>${task.lastModified}</small>
        <div>
          ${stage === 'todo' ? `<button data-id="${task.id}" data-action="complete">Complete</button>` : ''}
          ${stage === 'completed' ? `<button data-id="${task.id}" data-action="todo">Undo</button>` : ''}
          ${stage !== 'archived' ? `<button data-id="${task.id}" data-action="archive">Archive</button>` : `<button data-id="${task.id}" data-action="todo">Restore</button>`}
        </div>
      `;
      column.appendChild(div);
    });
  });
}

document.body.addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON' && e.target.dataset.id) {
    const id = parseFloat(e.target.dataset.id);
    const newStage = e.target.dataset.action;
    moveTask(id, newStage);
  }
});

function moveTask(id, newStage) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.stage = newStage;
    task.lastModified = new Date().toLocaleString();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}
