// const taskList = document.getElementById("task-list");
// const tabs = document.querySelectorAll(".tab");
// const addBtn = document.getElementById("addBtn");
// const searchBtn = document.getElementById("searchBtn");
// const searchInput = document.getElementById("searchInput");
// const signOutBtn = document.querySelector(".signout");

// let tasks = [];
// let currentTab = 'todo';

// function renderTasks(filter = currentTab, query = '') {
//   taskList.innerHTML = '';
//   currentTab = filter;
//   const filtered = tasks.filter(task =>
//     task.status === filter && task.text.toLowerCase().includes(query.toLowerCase())
//   );

//   filtered.forEach(task => {
//     const div = document.createElement("div");
//     div.className = "task";
//     div.innerHTML = `
//       <div class="content">${task.text}</div>
//       <div class="meta">Last Modified: ${task.date}</div>
//       <div class="actions">
//         ${task.status === 'todo' ? `
//           <button class="complete" data-id="${task.id}">Completed</button>
//           <button class="archive" data-id="${task.id}">Archive</button>
//         ` : ''}
//         ${task.status === 'completed' ? `
//           <button class="undo" data-id="${task.id}">Not Completed</button>
//           <button class="archive" data-id="${task.id}">Archive</button>
//         ` : ''}
//         ${task.status === 'archived' ? `
//           <button class="unarchive" data-id="${task.id}">Unarchive</button>
//         ` : ''}
//       </div>
//     `;
//     taskList.appendChild(div);
//   });

//   attachActionHandlers();
//   updateCounts();
// }

// function updateCounts() {
//   document.getElementById("todo-count").textContent = tasks.filter(t => t.status === 'todo').length;
//   document.getElementById("completed-count").textContent = tasks.filter(t => t.status === 'completed').length;
//   document.getElementById("archived-count").textContent = tasks.filter(t => t.status === 'archived').length;
// }

// function markCompleted(id) {
//   const task = tasks.find(t => t.id == id);
//   if (task) {
//     task.status = 'completed';
//     task.date = new Date().toLocaleString();
//     renderTasks(currentTab, searchInput.value);
//   }
// }

// function markArchived(id) {
//   const task = tasks.find(t => t.id == id);
//   if (task) {
//     task.status = 'archived';
//     task.date = new Date().toLocaleString();
//     renderTasks(currentTab, searchInput.value);
//   }
// }

// function markUnarchived(id) {
//   const task = tasks.find(t => t.id == id);
//   if (task) {
//     task.status = 'todo';
//     task.date = new Date().toLocaleString();
//     renderTasks(currentTab, searchInput.value);
//   }
// }

// function markTodo(id) {
//   const task = tasks.find(t => t.id == id);
//   if (task) {
//     task.status = 'todo';
//     task.date = new Date().toLocaleString();
//     renderTasks(currentTab, searchInput.value);
//   }
// }

// addBtn.addEventListener("click", () => {
//   const text = prompt("Enter task:");
//   if (text && text.trim()) {
//     tasks.push({
//       id: Date.now(),
//       text: text.trim(),
//       status: 'todo',
//       date: new Date().toLocaleString()
//     });
//     renderTasks('todo');
//     setActiveTab('todo');
//   }
// });

// tabs.forEach(tab => {
//   tab.addEventListener("click", () => {
//     tabs.forEach(t => t.classList.remove("active"));
//     tab.classList.add("active");
//     const selectedTab = tab.getAttribute("data-tab");
//     renderTasks(selectedTab, searchInput.value);
//   });
// });

// searchBtn.addEventListener("click", () => {
//   renderTasks(currentTab, searchInput.value);
// });

// function setActiveTab(tabName) {
//   tabs.forEach(tab => {
//     tab.classList.toggle("active", tab.getAttribute("data-tab") === tabName);
//   });
//   currentTab = tabName;
// }

// function attachActionHandlers() {
//   document.querySelectorAll(".complete").forEach(btn => {
//     btn.addEventListener("click", () => {
//       markCompleted(btn.getAttribute("data-id"));
//     });
//   });

//   document.querySelectorAll(".archive").forEach(btn => {
//     btn.addEventListener("click", () => {
//       markArchived(btn.getAttribute("data-id"));
//     });
//   });

//   document.querySelectorAll(".unarchive").forEach(btn => {
//     btn.addEventListener("click", () => {
//       markUnarchived(btn.getAttribute("data-id"));
//     });
//   });

//   document.querySelectorAll(".undo").forEach(btn => {
//     btn.addEventListener("click", () => {
//       markTodo(btn.getAttribute("data-id"));
//     });
//   });
// }

// signOutBtn.addEventListener("click", () => {
//   window.location.href = "index.html";
// });

// renderTasks('todo');

// ------------------------------------------ 
//  ---- Dark mode and Local Storage ---- 
const taskList = document.getElementById("task-list");
const tabs = document.querySelectorAll(".tab");
const addBtn = document.getElementById("addBtn");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const signOutBtn = document.querySelector(".signout");
const darkModeToggle = document.getElementById("darkModeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentTab = 'todo';


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

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
        ${task.status === 'todo' ? `
          <button class="complete" data-id="${task.id}">Completed</button>
          <button class="archive" data-id="${task.id}">Archive</button>
        ` : ''}
        ${task.status === 'completed' ? `
          <button class="undo" data-id="${task.id}">Not Completed</button>
          <button class="archive" data-id="${task.id}">Archive</button>
        ` : ''}
        ${task.status === 'archived' ? `
          <button class="unarchive" data-id="${task.id}">Unarchive</button>
        ` : ''}
      </div>
    `;
    taskList.appendChild(div);
  });

  attachActionHandlers();
  updateCounts();
}

function updateCounts() {
  document.getElementById("todo-count").textContent = tasks.filter(t => t.status === 'todo').length;
  document.getElementById("completed-count").textContent = tasks.filter(t => t.status === 'completed').length;
  document.getElementById("archived-count").textContent = tasks.filter(t => t.status === 'archived').length;
}

function markCompleted(id) {
  const task = tasks.find(t => t.id == id);
  if (task) {
    task.status = 'completed';
    task.date = new Date().toLocaleString();
    saveTasks();
    renderTasks(currentTab, searchInput.value);
  }
}

function markArchived(id) {
  const task = tasks.find(t => t.id == id);
  if (task) {
    task.status = 'archived';
    task.date = new Date().toLocaleString();
    saveTasks();
    renderTasks(currentTab, searchInput.value);
  }
}

function markUnarchived(id) {
  const task = tasks.find(t => t.id == id);
  if (task) {
    task.status = 'todo';
    task.date = new Date().toLocaleString();
    saveTasks();
    renderTasks(currentTab, searchInput.value);
  }
}

function markTodo(id) {
  const task = tasks.find(t => t.id == id);
  if (task) {
    task.status = 'todo';
    task.date = new Date().toLocaleString();
    saveTasks();
    renderTasks(currentTab, searchInput.value);
  }
}

addBtn.addEventListener("click", () => {
  const text = prompt("Enter task:");
  if (text && text.trim()) {
    tasks.push({
      id: Date.now(),
      text: text.trim(),
      status: 'todo',
      date: new Date().toLocaleString()
    });
    saveTasks();
    renderTasks('todo');
    setActiveTab('todo');
  }
});

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const selectedTab = tab.getAttribute("data-tab");
    renderTasks(selectedTab, searchInput.value);
  });
});

searchBtn.addEventListener("click", () => {
  renderTasks(currentTab, searchInput.value);
});

function setActiveTab(tabName) {
  tabs.forEach(tab => {
    tab.classList.toggle("active", tab.getAttribute("data-tab") === tabName);
  });
  currentTab = tabName;
}

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

  document.querySelectorAll(".unarchive").forEach(btn => {
    btn.addEventListener("click", () => {
      markUnarchived(btn.getAttribute("data-id"));
    });
  });

  document.querySelectorAll(".undo").forEach(btn => {
    btn.addEventListener("click", () => {
      markTodo(btn.getAttribute("data-id"));
    });
  });
}

// Sign out button
signOutBtn.addEventListener('click', () => {
  if (confirm("Are you sure you want to sign out? This will clear all saved tasks.")) {
    localStorage.clear();
    window.location.href = 'index.html'; // Redirect to index.html
  }
});


// 🌙 Dark Mode Toggle
function applyDarkMode(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
}

darkModeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
});

// Restore dark mode setting on load
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
}

// renderTasks('todo');
// Save selected tab to localStorage
function setActiveTab(tabName) {
  tabs.forEach(tab => {
    tab.classList.toggle("active", tab.getAttribute("data-tab") === tabName);
  });
  currentTab = tabName;
  localStorage.setItem("selectedTab", tabName);
}

// On page load, restore selected tab
const savedTab = localStorage.getItem("selectedTab") || "todo";
setActiveTab(savedTab);
renderTasks(savedTab);


