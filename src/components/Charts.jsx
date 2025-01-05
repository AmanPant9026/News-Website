import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const Charts = ({ data }) => {
  // Group articles by author and count them
  const authors = data.map((article) => article.author || 'Unknown');
  const counts = authors.reduce((acc, author) => {
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {});

  // Prepare chart data
  const chartData = {
    labels: Object.keys(counts),
    datasets: [
      {
        label: 'Number of Articles by Author',
        data: Object.values(counts),
        backgroundColor: [
          '#4CAF50',
          '#FF9800',
          '#2196F3',
          '#E91E63',
          '#9C27B0',
          '#00BCD4',
        ],
        borderColor: '#000000',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows resizing the chart
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Articles Distribution by Author',
        color: '#111',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw} articles`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#666',
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: '#666',
          font: {
            size: 12,
          },
        },
        grid: {
          color: '#ddd',
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8" style={{ height: '400px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Charts;
