import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const BarChartDemo: React.FC = () => {
  // Check if we're in the browser
  if (typeof window === 'undefined') {
    return <div className="my-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md" style={{ height: '350px' }}>Loading chart...</div>
  }
  const data = {
    labels: ['React', 'Vue', 'Angular', 'Svelte', 'Next.js'],
    datasets: [
      {
        label: 'GitHub Stars (thousands)',
        data: [215, 206, 92, 73, 115],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(147, 51, 234, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(239, 68, 68)',
          'rgb(251, 146, 60)',
          'rgb(147, 51, 234)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Popular JavaScript Frameworks',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="my-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div style={{ height: '350px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default BarChartDemo
