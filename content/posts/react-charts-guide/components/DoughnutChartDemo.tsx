import React from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChartDemo: React.FC = () => {
  // Check if we're in the browser
  if (typeof window === 'undefined') {
    return <div className="my-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md" style={{ height: '350px' }}>Loading chart...</div>
  }
  const data = {
    labels: ['JavaScript', 'TypeScript', 'CSS', 'HTML', 'Other'],
    datasets: [
      {
        label: 'Language Distribution',
        data: [40, 30, 15, 10, 5],
        backgroundColor: [
          'rgba(251, 191, 36, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
        borderColor: [
          'rgb(251, 191, 36)',
          'rgb(59, 130, 246)',
          'rgb(147, 51, 234)',
          'rgb(251, 146, 60)',
          'rgb(156, 163, 175)',
        ],
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Codebase Language Distribution',
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed + '%';
            }
            return label;
          }
        }
      }
    },
  }

  return (
    <div className="my-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div style={{ height: '350px' }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
}

export default DoughnutChartDemo
