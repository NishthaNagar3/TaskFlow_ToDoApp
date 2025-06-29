 
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

// 🟣 Dynamically update HTML spans with task stats
document.getElementById('totalTasks').textContent = totalTasks;
document.getElementById('achievedTasks').textContent = completedTasks;




// Bar chart setup with 3 vertical bars (each 100% stacked)
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
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
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
      mode: 'index',
      axis: 'x',
      intersect: false
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Task Categories',
          color: '#c7b8f2'
        },
        // grid: {
        //   color: '#c7b8f2',
        //   borderColor: '#c7b8f2'
        // },
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




// --------------- og options for bar chart formatiiong -------------
//   options: {
//     responsive: true,
//     plugins: {
//       title: {
//         display: true,
//         text: 'Task Status Distribution (100% Stacked Bars)'
//       },
//       tooltip: {
//         mode: 'index',
//         intersect: false,
//         callbacks: {
//           label: function(context) {
//             return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
//           }
//         }
//       },
//       legend: {
//         position: 'bottom'
//       }
//     },
//     interaction: {
//       mode: 'index',
//       axis: 'x',
//       intersect: false
//     },
//     scales: {
//       x: {
//         stacked: true,
//         title: {
//           display: true,
//           text: 'Task Categories'
//         }
//       },
//       y: {
//         stacked: true,
//         beginAtZero: true,
//         max: 100,
//         title: {
//           display: true,
//           text: 'Percentage (%)'
//         }
//       }
//     }