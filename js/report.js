
// ------------------------- new with hover specific ---------- 
// ------------------------------
// Fetch data from local storage first
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const totalTasks = tasks.length || 1; // prevent divide by zero
const completedTasks = tasks.filter(task => task.status === 'completed').length;
const archivedTasks = tasks.filter(task => task.status === 'archived').length;
const notCompletedTasks = totalTasks - (completedTasks + archivedTasks);

// Calculate percentage values
const completedPercent = (completedTasks / totalTasks) * 100;
const archivedPercent = (archivedTasks / totalTasks) * 100;
const notCompletedPercent = (notCompletedTasks / totalTasks) * 100;

// Update HTML with task stats
document.getElementById('totalTasks').textContent = totalTasks;
document.getElementById('achievedTasks').textContent = completedTasks;

// Bar chart setup
const ctxBar = document.getElementById('barChart').getContext('2d');

const barChart = new Chart(ctxBar, {
  type: 'bar',
  data: {
    labels: ['Completed', 'Archived', 'Not Completed'],
    datasets: [
      {
        label: 'Completed',
        data: [completedPercent, 0, 0],
        backgroundColor: '#4CAF50'
      },
      {
        label: 'Archived',
        data: [0, archivedPercent, 0],
        backgroundColor: '#FFC107'
      },
      {
        label: 'Not Completed',
        data: [0, 0, notCompletedPercent],
        backgroundColor: '#F44336'
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Task Status Distribution (100% Stacked Bars)',
        color: '#a78bfa',
        font: {
          size: 18,
          weight: 'bold'
        }
      },
      tooltip: {
        mode: 'nearest',  // Show tooltip for hovered bar only
        intersect: true,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label;
            let value = 0;
            let percent = context.parsed.y.toFixed(1);

            if (label === 'Completed') {
              value = completedTasks;
            } else if (label === 'Archived') {
              value = archivedTasks;
            } else if (label === 'Not Completed') {
              value = notCompletedTasks;
            }

            return `${label}: ${value} task${value !== 1 ? 's' : ''} (${percent}%)`;
          }
        }
      },
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgb(199, 184, 242)',
          font: {
            size: 12,
            weight: 'semibold'
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Task Categories',
          color: '#c7b8f2'
        },
        ticks: {
          color: '#c7b8f2'
        }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Percentage (%)',
          color: '#c7b8f2'
        },
        grid: {
          color: '#c7b8f2',
          borderColor: '#c7b8f2'
        },
        ticks: {
          color: '#c7b8f2'
        }
      }
    }
  }
});

// Handle Sign Out button
document.querySelector('.signout').addEventListener('click', () => {
  localStorage.removeItem('tasks');
  window.location.href = 'index.html';
});

// Profile Initial
const user = JSON.parse(localStorage.getItem("user"));
const initialSpan = document.querySelector(".initial");
if (user && user.name && initialSpan) {
  initialSpan.textContent = user.name.charAt(0).toUpperCase();
}

