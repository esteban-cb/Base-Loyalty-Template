'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TrendsData {
  historical: {
    monthly: Array<{
      month: string;
      avgPoints: number;
      avgEngagement: number;
    }>;
  };
}

export default function TrendsChart({ data }: { data: TrendsData }) {
  const chartData = {
    labels: data.historical.monthly.map(m => m.month),
    datasets: [
      {
        label: 'Average Points',
        data: data.historical.monthly.map(m => m.avgPoints),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'Engagement Score',
        data: data.historical.monthly.map(m => m.avgEngagement),
        backgroundColor: 'rgba(147, 51, 234, 0.8)',
      }
    ]
  };

  return (
    <div className="card rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Monthly Trends</h2>
      <Bar data={chartData} />
    </div>
  );
}
