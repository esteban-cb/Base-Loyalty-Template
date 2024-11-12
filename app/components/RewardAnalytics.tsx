'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface RewardAnalyticsProps {
  data: {
    redemption: {
      analytics: {
        popularRewards: string[];
        avgRedemptionTime: string;
        successRate: string;
      }
    }
  }
}

export default function RewardAnalytics({ data }: RewardAnalyticsProps) {
  const chartData = {
    labels: data.redemption.analytics.popularRewards,
    datasets: [{
      data: [65, 25, 10], // Example distribution
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(147, 51, 234, 0.8)',
        'rgba(234, 179, 8, 0.8)',
      ]
    }]
  };

  return (
    <div className="card rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Reward Distribution</h2>
      <Doughnut data={chartData} />
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">Average Redemption Time: {data.redemption.analytics.avgRedemptionTime}</p>
        <p className="text-sm text-gray-400">Success Rate: {data.redemption.analytics.successRate}</p>
      </div>
    </div>
  );
}
