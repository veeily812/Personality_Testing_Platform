import { hollandLabels, mbtiLabels } from '../utils/constants.js';

export function createHollandChart(hollandCount) {
  const container = document.createElement('div');
  container.className = 'h-96 w-full max-w-2xl mx-auto';
  
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const data = {
    labels: Object.keys(hollandCount).map(key => hollandLabels[key]),
    datasets: [
      {
        label: 'Your Holland Scores',
        data: Object.values(hollandCount),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  new Chart(ctx, {
    type: 'radar',
    data: data,
    options: {
      scales: {
        r: {
          beginAtZero: true,
          max: 3,
          ticks: {
            stepSize: 1
          }
        }
      },
      maintainAspectRatio: false,
      responsive: true,
      layout: {
        padding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }
      }
    }
  });

  return container;
}

export function createMBTIChart(mbtiCount) {
  const container = document.createElement('div');
  container.className = 'h-96 w-full max-w-2xl mx-auto';
  
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const data = {
    labels: Object.keys(mbtiCount).map(key => mbtiLabels[key]),
    datasets: [
      {
        label: 'Your MBTI Preferences',
        data: Object.values(mbtiCount),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 4,
          ticks: {
            stepSize: 1
          }
        }
      },
      maintainAspectRatio: false,
      responsive: true,
      layout: {
        padding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }
      }
    }
  });

  return container;
} 