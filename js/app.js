document.addEventListener('DOMContentLoaded', () => {
  const taskListEl = document.getElementById('task-list');
  const addBtn = document.getElementById('addBtn');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const tabs = document.querySelectorAll('.tab');
  const darkToggle = document.getElementById('darkModeToggle');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let currentTab = 'todo';

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function updateCounts() {
    document.getElementById('todo-count').textContent = tasks.filter(t => !t.completed && !t.archived).length;
    document.getElementById('completed-count').textContent = tasks.filter(t => t.completed && !t.archived).length;
    document.getElementById('archived-count').textContent = tasks.filter(t => t.archived).length;
  }

  function renderTasks() {
    taskListEl.innerHTML = '';
    const filtered = tasks.filter(task => {
      if (currentTab === 'todo') return !task.completed && !task.archived;
      if (currentTab === 'completed') return task.completed && !task.archived;
      if (currentTab === 'archived') return task.archived;
    });

    filtered.forEach((task, index) => {
      const el = document.createElement('div');
      el.className = 'task';
      el.innerHTML = `
        <div>${task.text}</div>
        <div class="meta">${task.date}</div>
        <div class="actions">
          ${!task.completed && !task.archived ? `<button class="complete" data-index="${index}">Complete</button>` : ''}
          ${!task.archived ? `<button class="archive" data-index="${index}">Archive</button>` : ''}
        </div>
      `;
      taskListEl.appendChild(el);
    });

    updateCounts();
  }

  function addTask() {
    const text = prompt('Enter your task');
    if (!text) return;
    const newTask = {
      text,
      completed: false,
      archived: false,
      date: new Date().toLocaleString()
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
  }

  function handleActionClick(e) {
    const index = e.target.dataset.index;
    if (e.target.classList.contains('complete')) {
      tasks[index].completed = true;
    } else if (e.target.classList.contains('archive')) {
      tasks[index].archived = true;
    }
    saveTasks();
    renderTasks();
  }

  function searchTasks() {
    const term = searchInput.value.toLowerCase();
    const filtered = tasks.filter(t => t.text.toLowerCase().includes(term));
    taskListEl.innerHTML = '';
    filtered.forEach((task, index) => {
      const el = document.createElement('div');
      el.className = 'task';
      el.innerHTML = `
        <div>${task.text}</div>
        <div class="meta">${task.date}</div>
        <div class="actions">
          ${!task.completed && !task.archived ? `<button class="complete" data-index="${index}">Complete</button>` : ''}
          ${!task.archived ? `<button class="archive" data-index="${index}">Archive</button>` : ''}
        </div>
      `;
      taskListEl.appendChild(el);
    });
  }

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.dataset.tab;
      renderTasks();
    });
  });

  // Dark mode toggle with localStorage
  function loadDarkMode() {
    const mode = localStorage.getItem('darkMode');
    if (mode === 'enabled') {
      document.body.classList.add('dark-mode');
    }
  }

  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  }

  darkToggle.addEventListener('click', toggleDarkMode);
  taskListEl.addEventListener('click', handleActionClick);
  addBtn.addEventListener('click', addTask);
  searchBtn.addEventListener('click', searchTasks);

  // Initial load
  loadDarkMode();
  renderTasks();
});
