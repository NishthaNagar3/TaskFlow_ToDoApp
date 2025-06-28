const taskList = document.getElementById("task-list");
const tabs = document.querySelectorAll(".tab");
const addBtn = document.getElementById("addBtn");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

let tasks = [];
let currentTab = 'todo';

// Render tasks by tab and search query
function renderTasks(filter = currentTab, query = '') {
  taskList.innerHTML = '';
  currentTab = filter;
  const filtered = tasks.filter(task =>
    task.status === filter && task.text.toLowerCase().includes(query.toLowerCase())
  );

  filtered.forEach(task => {
    const div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `
      <div class="content">${task.text}</div>
      <div class="meta">Last Modified: ${task.date}</div>
      <div class="actions">
        ${task.status === 'todo' ? `<button class="complete" data-id="${task.id}">Completed</button>` : ''}
        ${task.status !== 'archived' ? `<button class="archive" data-id="${task.id}">Archive</button>` : ''}
      </div>
    `;
    taskList.appendChild(div);
  });

  attachActionHandlers();
  updateCounts();
}

// Update counts for each tab
function updateCounts() {
  document.getElementById("todo-count").textContent = tasks.filter(t => t.status === 'todo').length;
  document.getElementById("completed-count").textContent = tasks.filter(t => t.status === 'completed').length;
  document.getElementById("archived-count").textContent = tasks.filter(t => t.status === 'archived').length;
}

// Handle mark as completed
function markCompleted(id) {
  const task = tasks.find(t => t.id == id);
  if (task) {
    task.status = 'completed';
    task.date = new Date().toLocaleString();
    renderTasks(currentTab, searchInput.value);
  }
}

// Handle archive
function markArchived(id) {
  const task = tasks.find(t => t.id == id);
  if (task) {
    task.status = 'archived';
    task.date = new Date().toLocaleString();
    renderTasks(currentTab, searchInput.value);
  }
}

// Add new task
addBtn.addEventListener("click", () => {
  const text = prompt("Enter task:");
  if (text && text.trim()) {
    tasks.push({
      id: Date.now(),
      text: text.trim(),
      status: 'todo',
      date: new Date().toLocaleString()
    });
    renderTasks('todo');
    setActiveTab('todo');
  }
});

// Switch tabs
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const selectedTab = tab.getAttribute("data-tab");
    renderTasks(selectedTab, searchInput.value);
  });
});

// Search functionality
searchBtn.addEventListener("click", () => {
  renderTasks(currentTab, searchInput.value);
});

// Handle actions (delegation)
function attachActionHandlers() {
  document.querySelectorAll(".complete").forEach(btn => {
    btn.addEventListener("click", () => {
      markCompleted(btn.getAttribute("data-id"));
    });
  });

  document.querySelectorAll(".archive").forEach(btn => {
    btn.addEventListener("click", () => {
      markArchived(btn.getAttribute("data-id"));
    });
  });
}

// Set active tab UI
function setActiveTab(tabName) {
  tabs.forEach(tab => {
    tab.classList.toggle("active", tab.getAttribute("data-tab") === tabName);
  });
  currentTab = tabName;
}

// Initial render
renderTasks('todo');


