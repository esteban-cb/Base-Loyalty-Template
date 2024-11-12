import { dummyUserData } from '../lib/dummyData';

export default function TransactionHistory() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Transaction History</h2>
        <div className="flex space-x-4">
          <select className="bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
            <option>All Types</option>
            <option>Points Earned</option>
            <option>Rewards Claimed</option>
            <option>Tier Updates</option>
          </select>
          <select className="bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {dummyUserData.recentActivity.map(activity => (
          <div key={activity.id} className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-gray-300">{activity.description}</span>
              <span className="text-gray-500">{activity.timestamp}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className={`${activity.points > 0 ? 'text-green-500' : 'text-red-500'}`}>{activity.points}</span>
              <span className="text-gray-500">{activity.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
