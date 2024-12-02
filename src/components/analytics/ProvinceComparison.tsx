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
import { ProvinceStats } from '../../types/analytics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProvinceComparisonProps {
  stats: ProvinceStats[];
}

export function ProvinceComparison({ stats }: ProvinceComparisonProps) {
  const data = {
    labels: stats.map(stat => stat.province),
    datasets: [
      {
        label: 'Reports',
        data: stats.map(stat => stat.reports),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Issues',
        data: stats.map(stat => stat.issues),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
      },
      {
        label: 'Actions',
        data: stats.map(stat => stat.actions),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
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
        text: 'Province Comparison',
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