import React from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChartDemo: React.FC = () => {
  // Check if we're in the browser
  if (typeof window === 'undefined') {
    return <div className="my-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md" style={{ height: '350px' }}>Loading chart...</div>
  }
  const data = {
    labels: ['Desktop', 'Mobile', 'Tablet', 'Other'],
    datasets: [
      {
        label: 'Device Usage %',
        data: [55, 35, 8, 2],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(147, 51, 234, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(251, 146, 60)',
          'rgb(147, 51, 234)',
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
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Website Traffic by Device Type',
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
        <Pie data={data} options={options} />
      </div>
    </div>
  )
}

export default PieChartDemo
