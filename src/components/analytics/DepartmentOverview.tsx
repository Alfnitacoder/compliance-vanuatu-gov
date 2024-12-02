import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { DepartmentStats } from '../../types/analytics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DepartmentOverviewProps {
  stats: DepartmentStats[];
}

export function DepartmentOverview({ stats }: DepartmentOverviewProps) {
  const data = {
    labels: stats.map(stat => stat.department),
    datasets: [
      {
        label: 'Active Items',
        data: stats.map(stat => stat.activeItems),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Pending Review',
        data: stats.map(stat => stat.pendingReview),
        backgroundColor: 'rgba(245, 158, 11, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Department Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Bar data={data} options={options} />
    </div>
  );
}