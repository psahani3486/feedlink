'use client';
import { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Filler, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Filler, Title, Tooltip, Legend);

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } } },
    tooltip: { backgroundColor: '#1a2332', titleColor: '#f1f5f9', bodyColor: '#94a3b8', borderColor: 'rgba(148,163,184,0.12)', borderWidth: 1, cornerRadius: 8, padding: 10 },
  },
  scales: {
    x: { ticks: { color: '#64748b', font: { size: 10 } }, grid: { color: 'rgba(148,163,184,0.06)' } },
    y: { ticks: { color: '#64748b', font: { size: 10 } }, grid: { color: 'rgba(148,163,184,0.06)' } },
  },
};

export function BarChart({ data, options = {} }) {
  return <div className="chart-wrapper"><Bar data={data} options={{ ...commonOptions, ...options }} /></div>;
}

export function LineChart({ data, options = {} }) {
  return <div className="chart-wrapper"><Line data={data} options={{ ...commonOptions, ...options }} /></div>;
}

export function DoughnutChart({ data, options = {} }) {
  const dOpts = { ...commonOptions, scales: {}, ...options };
  return <div className="chart-wrapper"><Doughnut data={data} options={dOpts} /></div>;
}
