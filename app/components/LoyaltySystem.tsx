'use client';

import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import SystemInfo from './SystemInfo';
import { MetadataRecord } from '../types/loyalty';
import { ContractABI } from '../types/contracts';
import Image from 'next/image';

interface UserTier {
  level: 'Bronze' | 'Silver' | 'Gold';
  points: number;
  requiredPoints: number;
  nftId: string;
  achievedDate: string;
}

interface Transaction {
  id: string;
  type: 'earn' | 'redeem' | 'pending';
  points: number;
  timestamp: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

interface Notification {
  id: string;
  type: 'erc20_transfer' | 'erc721_transfer' | 'transaction' | 'tier_update' | 'reward_claim' | 'milestone';
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface DashboardStats {
  totalUsers: number;
  activeUsers24h: number;
  totalPointsIssued: string;
  avgEngagement: number;
  rewardRedemptionRate: string;
  topRewards: Array<{name: string, claims: number}>;
}

interface Activity {
  id: string;
  type: 'point_earn' | 'reward_claim' | 'tier_upgrade' | 'referral' | 'achievement';
  description: string;
  timestamp: string;
  points?: number;
  metadata?: MetadataRecord;
  status?: 'completed' | 'pending' | 'failed';
}

interface LeaderboardEntry {
  rank: number;
  basename: string;
  name: string;
  points: number;
  tier: string;
  avatar?: string;
}

interface RewardContract {
    address: string;
    network: 'mainnet' | 'testnet';
    type: 'erc20' | 'erc721';
    abi: ContractABI[];
  }

  interface CDPEvent {
    id: string;
    type: string;
    timestamp: string;
    data: MetadataRecord;
    network: string;
  }

interface NetworkConfig {
  id: number;
  name: string;
  rpcUrl: string;
  explorer: string;
  contracts: Record<string, string>;
}

interface CDPMetric {
  method: string;
  calls: number;
  growth: string;
}

function DashboardOverview({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="card p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-2">Community Growth</h3>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
            <p className="text-sm text-gray-400">Total Users</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold text-green-500">+{stats.activeUsers24h}</p>
            <p className="text-sm text-gray-400">Last 24h</p>
          </div>
        </div>
      </div>

      <div className="card p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-2">Points Economy</h3>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-3xl font-bold">{stats.totalPointsIssued}</p>
            <p className="text-sm text-gray-400">Total Points</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold">{stats.rewardRedemptionRate}</p>
            <p className="text-sm text-gray-400">Redemption Rate</p>
          </div>
        </div>
      </div>

      <div className="card p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-2">Engagement Score</h3>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-3xl font-bold">{stats.avgEngagement}%</p>
            <p className="text-sm text-gray-400">Average Score</p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center text-green-500">
              <span className="text-lg">↑</span>
              <span className="ml-1">12%</span>
            </div>
            <p className="text-sm text-gray-400">vs Last Month</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityTimeline({ activities }: { activities: Activity[] }) {
  return (
    <div className="card p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className="min-w-fit">
              <span className="inline-block p-2 rounded-full bg-blue-500/10">
                {activity.type === 'point_earn' && '💎'}
                {activity.type === 'reward_claim' && '🎁'}
                {activity.type === 'tier_upgrade' && '⭐'}
                {activity.type === 'referral' && '👥'}
              </span>
            </div>
            <div className="flex-grow">
              <p className="font-medium">{activity.description}</p>
              <p className="text-sm text-gray-400">
                {new Date(activity.timestamp).toLocaleString()}
              </p>
            </div>
            {activity.points && (
              <div className="text-right">
                <p className="font-semibold text-green-500">+{activity.points} points</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Leaderboard({ entries }: { entries: LeaderboardEntry[] }) {
  return (
    <div className="card p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Top Community Members</h2>
      <div className="space-y-4">
        {entries.map(entry => (
          <div key={entry.basename}
               className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-bold w-8">{entry.rank}</span>
              <div className="flex items-center space-x-3">
                {entry.avatar ? (
                  <Image
                    src={entry.avatar}
                    alt={`${entry.basename}'s avatar`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-500/20" />
                )}
                <div>
                  <p className="font-medium">{entry.basename}</p>
                  <p className="text-sm text-gray-400">{entry.tier}</p>
                </div>
              </div>
            </div>
            <p className="font-bold">{entry.points.toLocaleString()} pts</p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface DummyUserData {
  basename: string;
  registrationDate: string;
  points: {
    balance: number;
    lifetime: number;
  };
  stats: {
    community: {
      totalUsers: number;
      last24h: number;
      weeklyGrowth: string;
      monthlyGrowth: string;
      activeRegions: Array<{ name: string; users: number }>;
    };
    pointsEconomy: {
      totalPoints: string;
      redemptionRate: string;
      averageHolding: number;
      distribution: {
        rewards: string;
        referrals: string;
        engagement: string;
      };
    };
    engagement: {
      score: number;
      growth: string;
      breakdown: {
        daily: number;
        weekly: number;
        monthly: number;
      };
    };
  };
  topMembers: Array<{
    rank: number;
    basename: string;
    points: number;
    tier: string;
    joinDate: string;
    achievements: number;
  }>;
  recentActivity: Activity[];
}

export default function LoyaltySystem() {
  const { address, isConnected } = useAccount();
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'earn' | 'store' | 'analytics' | 'history' | 'system'>('overview');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalUsers: 1500,
    activeUsers24h: 25,
    totalPointsIssued: '150,000',
    avgEngagement: 85,
    rewardRedemptionRate: '85%',
    topRewards: [
      { name: 'NFT Badge', claims: 150 },
      { name: 'Premium Access', claims: 120 },
      { name: 'Special Role', claims: 90 }
    ]
  });

  // Enhanced dummy data
  const dummyUserData = {
    basename: 'crypto.base',
    registrationDate: '2024-01-01T00:00:00Z',
    stats: {
      community: {
        totalUsers: 1500,
        last24h: 25
      },
      pointsEconomy: {
        totalPoints: '150,000',
        redemptionRate: '85%'
      },
      engagement: {
        score: 85,
        growth: '+12%'
      }
    },
    tier: {
      current: 'Silver' as const,
      progress: 750,
      next: 'Gold',
      nextThreshold: 1000,
      nftAddress: '0x1234...5678',
      history: [
        { level: 'Bronze', achievedDate: '2024-01-15', points: 250, nftId: '0x789...012' },
        { level: 'Silver', achievedDate: '2024-02-28', points: 500, nftId: '0x345...678' },
      ],
    },
    points: {
      balance: 750,
      lifetime: 1200,
      pending: 50,
      breakdown: {
        purchases: 450,
        referrals: 200,
        engagement: 100,
      },
    },
    transactions: [
      {
        id: '1',
        type: 'earn',
        points: 100,
        timestamp: '2024-03-20T10:00:00Z',
        description: 'Daily login bonus',
        status: 'completed',
      },
      {
        id: '2',
        type: 'pending',
        points: 50,
        timestamp: '2024-03-20T11:30:00Z',
        description: 'Referral reward pending',
        status: 'pending',
      },
    ] as Transaction[],
    rewards: [
      { id: 1, name: 'Exclusive NFT', cost: 1000, type: 'nft', rarity: 'Legendary' },
      { id: 2, name: 'VIP Access Token', cost: 500, type: 'token', rarity: 'Rare' },
      { id: 3, name: 'Special Badge', cost: 250, type: 'badge', rarity: 'Common' },
    ],
    analytics: {
      engagementScore: 85,
      rewardPreferences: ['NFTs', 'Access Tokens', 'Badges'],
      activityHeatmap: {
        monday: 25,
        tuesday: 40,
        wednesday: 60,
        thursday: 30,
        friday: 45,
      },
      milestones: [
        { name: 'First Transaction', achieved: true, date: '2024-01-10' },
        { name: 'Five Referrals', achieved: true, date: '2024-02-15' },
        { name: '1000 Points', achieved: false, progress: 75 },
      ],
      trends: {
        pointsGrowth: '+15%',
        engagementGrowth: '+25%',
        rewardRedemption: '+10%',
      },
    },
    recentActivity: [
      {
        id: '1',
        type: 'point_earn',
        description: 'Daily login bonus',
        timestamp: '2024-03-20T10:00:00Z',
        points: 100,
        status: 'completed'
      },
      {
        id: '2',
        type: 'achievement',
        description: 'First purchase completed',
        timestamp: '2024-03-19T15:30:00Z',
        points: 50,
        status: 'completed'
      }
    ],
    topMembers: [
      {
        rank: 1,
        basename: 'John Doe',
        name: 'John Doe',
        points: 15000,
        avatar: '/avatars/user1.jpg',
        tier: 'Gold'
      },
      {
        rank: 2,
        basename: 'Jane Smith',
        name: 'Jane Smith',
        points: 12500,
        avatar: '/avatars/user2.jpg',
        tier: 'Silver'
      }
    ],
  };

  // Simulate notifications
  useEffect(() => {
    if (isConnected) {
      setNotifications([
        {
          id: '1',
          type: 'tier_update',
          message: 'Congratulations! You\'re close to reaching Gold tier!',
          timestamp: new Date().toISOString(),
          read: false,
          priority: 'high',
        },
        {
          id: '2',
          type: 'erc20_transfer',
          message: 'Points credited: +100 for daily login',
          timestamp: new Date().toISOString(),
          read: false,
          priority: 'medium',
        },
        {
          id: '3',
          type: 'milestone',
          message: 'Achievement unlocked: Five Referrals!',
          timestamp: new Date().toISOString(),
          read: false,
          priority: 'high',
        },
      ]);
    }
  }, [isConnected]);

  const [networkActivity] = useState({
    weeklyData: [
      {
        day: 'Mon',
        pointsActivity: 65,
        nftMints: 12,
        rewardsClaimed: 8
      },
      {
        day: 'Tue',
        pointsActivity: 85,
        nftMints: 15,
        rewardsClaimed: 10
      },
      {
        day: 'Wed',
        pointsActivity: 75,
        nftMints: 8,
        rewardsClaimed: 12
      },
      {
        day: 'Thu',
        pointsActivity: 90,
        nftMints: 20,
        rewardsClaimed: 15
      },
      {
        day: 'Fri',
        pointsActivity: 70,
        nftMints: 10,
        rewardsClaimed: 9
      },
      {
        day: 'Sat',
        pointsActivity: 80,
        nftMints: 14,
        rewardsClaimed: 11
      },
      {
        day: 'Sun',
        pointsActivity: 95,
        nftMints: 18,
        rewardsClaimed: 14
      }
    ]
  });

  // Add to dummyData
  const rewardContracts = {
    points: {
      address: '0xabc...def',
      network: 'mainnet',
      type: 'erc20',
      symbol: 'POINTS',
      decimals: 18
    },
    tiers: {
      address: '0xdef...123',
      network: 'mainnet',
      type: 'erc721',
      baseURI: 'https://base.loyalty/nft/'
    }
  };

  // Add to dummyData
  const cdpEvents = {
    indexer: {
      status: 'healthy',
      lastBlock: 12345678,
      eventsProcessed: 150000,
      avgLatency: '1.2s'
    },
    recentEvents: [
      {
        id: '0x123',
        type: 'erc20_transfer',
        timestamp: '2024-03-20T10:00:00Z',
        data: { from: '0x456', to: '0x789', amount: '100' },
        network: 'base_mainnet'
      },
      {
        id: '0x456',
        type: 'erc721_transfer',
        timestamp: '2024-03-20T09:30:00Z',
        data: { from: '0x123', to: '0x456', tokenId: '1' },
        network: 'base_mainnet'
      }
    ],
    metrics: {
      dailyActiveUsers: 1500,
      totalTransactions: 25000,
      avgPointsPerUser: 750,
      topRewards: [
        { name: 'Gold NFT', claims: 50 },
        { name: 'CDP Access', claims: 120 },
        { name: 'Explorer Badge', claims: 200 }
      ]
    }
  };

  // Add to dummyData
  const networks = {
    mainnet: {
      id: 8453,
      name: 'Base Mainnet',
      rpcUrl: 'https://mainnet.base.org',
      explorer: 'https://basescan.org',
      contracts: {
        points: '0x123...',
        tiers: '0x456...',
        registry: '0x789...'
      }
    },
    testnet: {
      id: 84532,
      name: 'Base Sepolia',
      rpcUrl: 'https://sepolia.base.org',
      explorer: 'https://sepolia.basescan.org',
      contracts: {
        points: '0xabc...',
        tiers: '0xdef...',
        registry: '0xghi...'
      }
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome to Base Loyalty Program</h2>
        <p className="text-gray-400">Please connect your wallet to view your loyalty status</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Notifications */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {dummyUserData.basename}</h1>
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full hover:bg-gray-700"
          >
            <BellIcon className="h-6 w-6" />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg p-4 z-50">
              <h3 className="text-lg font-semibold mb-3">Notifications</h3>
              <div className="space-y-3">
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded ${
                      notification.priority === 'high' ? 'bg-red-900/50' :
                      notification.priority === 'medium' ? 'bg-yellow-900/50' :
                      'bg-gray-700'
                    }`}
                  >
                    <p className="text-sm">{notification.message}</p>
                    <span className="text-xs text-gray-400">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6">
        {['overview', 'earn', 'store', 'analytics', 'history', 'system'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-lg ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'card hover:bg-opacity-80'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top Level Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 rounded-xl border border-blue-500/20">
              <h3 className="text-lg font-semibold mb-2">Community Growth</h3>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold">{dashboardStats.totalUsers}</p>
                  <p className="text-sm text-gray-400">Total Users</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-green-500">+{dashboardStats.activeUsers24h}</p>
                  <p className="text-sm text-gray-400">Last 24h</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 rounded-xl border border-green-500/20">
              <h3 className="text-lg font-semibold mb-2">Points Economy</h3>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold">{dashboardStats.totalPointsIssued}</p>
                  <p className="text-sm text-gray-400">Total Points</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold">{dashboardStats.rewardRedemptionRate}</p>
                  <p className="text-sm text-gray-400">Redemption Rate</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20">
              <h3 className="text-lg font-semibold mb-2">Engagement Score</h3>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold">{dashboardStats.avgEngagement}%</p>
                  <p className="text-sm text-gray-400">Average Score</p>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center text-green-500">
                    <span className="text-lg">↑</span>
                    <span className="ml-1">12%</span>
                  </div>
                  <p className="text-sm text-gray-400">vs Last Month</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Network Activity Graph */}
          <div className="card p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold">Network Activity</h3>
                <p className="text-sm text-gray-400">On-chain interactions across all features</p>
              </div>
              <select className="bg-white border border-gray-200 rounded-lg px-3 py-1 text-sm">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>

            <div className="relative h-64">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between pr-2">
                <span className="text-xs text-gray-400">100</span>
                <span className="text-xs text-gray-400">75</span>
                <span className="text-xs text-gray-400">50</span>
                <span className="text-xs text-gray-400">25</span>
                <span className="text-xs text-gray-400">0</span>
              </div>

              {/* Chart grid */}
              <div className="ml-8 h-full flex flex-col justify-between">
                <div className="border-b border-gray-100" />
                <div className="border-b border-gray-100" />
                <div className="border-b border-gray-100" />
                <div className="border-b border-gray-100" />
                <div className="border-b border-gray-100" />
              </div>

              {/* Bars */}
              <div className="absolute inset-0 ml-8 grid grid-cols-7 gap-2">
                {[
                  { day: 'Mon', points: 65, nfts: 12, rewards: 8 },
                  { day: 'Tue', points: 85, nfts: 15, rewards: 10 },
                  { day: 'Wed', points: 75, nfts: 8, rewards: 12 },
                  { day: 'Thu', points: 90, nfts: 20, rewards: 15 },
                  { day: 'Fri', points: 70, nfts: 10, rewards: 9 },
                  { day: 'Sat', points: 80, nfts: 14, rewards: 11 },
                  { day: 'Sun', points: 95, nfts: 18, rewards: 14 }
                ].map((data, i) => (
                  <div key={i} className="relative flex flex-col h-full pt-2 pb-6">
                    <div className="flex-grow flex flex-col justify-end space-y-1">
                      <div
                        className="w-full bg-blue-100 rounded-sm"
                        style={{ height: `${data.points}%` }}
                      >
                        <div className="absolute -top-5 w-full text-center">
                          <span className="text-xs text-gray-500">{data.points}</span>
                        </div>
                      </div>
                      <div
                        className="w-full bg-purple-100 rounded-sm"
                        style={{ height: `${data.nfts * 2}%` }}
                      />
                      <div
                        className="w-full bg-green-100 rounded-sm"
                        style={{ height: `${data.rewards * 2}%` }}
                      />
                    </div>
                    <span className="absolute bottom-0 w-full text-center text-sm text-gray-500">{data.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center mt-8 space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-100 rounded mr-2" />
                <span className="text-sm text-gray-500">Points Activity</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-100 rounded mr-2" />
                <span className="text-sm text-gray-500">NFT Mints</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-100 rounded mr-2" />
                <span className="text-sm text-gray-500">Rewards Claimed</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="card p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {dummyUserData.recentActivity.slice(0, 4).map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        {activity.type === 'point_earn' ? '🎯' : '🏆'}
                      </div>
                      <div>
                        <p className="font-medium">{activity.description}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-green-500">+{activity.points} pts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Members */}
            <div className="card p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Top Community Members</h3>
              <div className="space-y-4">
                {dummyUserData.topMembers.map((member) => (
                  <div key={member.rank} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-xl w-6">{member.rank}</span>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-400">{member.tier}</p>
                      </div>
                    </div>
                    <p className="font-bold">{member.points.toLocaleString()} pts</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Identity Verification Status */}
          <div className="card p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-blue-500/10">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">Base Identity</h3>
                <p className="text-sm text-gray-400">Verified through Base Registry</p>
                <div className="mt-2">
                  <p className="font-mono text-sm">{dummyUserData.basename}</p>
                  <p className="text-xs text-gray-400">Registered: {new Date(dummyUserData.registrationDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full">
                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                <span className="text-sm text-green-500">Verified</span>
              </div>
            </div>
          </div>

          {/* Network Status */}
          <div className="card p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Network Support</h3>
            <div className="space-y-3">
              {[
                { name: 'Base Mainnet', chainId: 8453, status: 'active' },
                { name: 'Base Sepolia', chainId: 84532, status: 'active' }
              ].map((network) => (
                <div key={network.chainId} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>{network.name}</span>
                  </div>
                  <span className="text-sm text-gray-400">Chain ID: {network.chainId}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Contract Analytics */}
          <div className="grid grid-cols-2 gap-6">
            <div className="card p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Token Analytics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">LOYALTY Token</p>
                    <p className="text-xl font-mono">0x123...456</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Total Supply</p>
                    <p className="text-xl font-bold">1,000,000</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Distribution</p>
                  <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex">
                    <div className="bg-blue-500 h-full" style={{ width: '60%' }} /> {/* Circulating */}
                    <div className="bg-purple-500 h-full" style={{ width: '25%' }} /> {/* Reserved */}
                    <div className="bg-green-500 h-full" style={{ width: '15%' }} /> {/* Treasury */}
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>60% Circulating</span>
                    <span>25% Reserved</span>
                    <span>15% Treasury</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">NFT Tier Distribution</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">Base Loyalty Tiers</p>
                    <p className="text-xl font-mono">0x789...012</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Total Minted</p>
                    <p className="text-xl font-bold">1,500</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { tier: 'Gold', count: 200, percentage: 13 },
                    { tier: 'Silver', count: 500, percentage: 33 },
                    { tier: 'Bronze', count: 800, percentage: 54 }
                  ].map((tier) => (
                    <div key={tier.tier}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{tier.tier}</span>
                        <span>{tier.count} holders</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            tier.tier === 'Gold' ? 'bg-yellow-500' :
                            tier.tier === 'Silver' ? 'bg-gray-400' : 'bg-orange-500'
                          }`}
                          style={{ width: `${tier.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CDP Integration Metrics */}
          <div className="card p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">CDP Integration Activity</h3>
            <div className="grid grid-cols-3 gap-6">
              {[
                { method: 'cdp_listBalances', calls: 15420, growth: '+12%' },
                { method: 'cdp_listAddressTransactions', calls: 8750, growth: '+8%' },
                { method: 'cdp_listBalanceHistories', calls: 6230, growth: '+15%' }
              ].map((metric) => (
                <div key={metric.method} className="bg-gray-50 p-4 rounded-xl">
                  <p className="font-mono text-sm mb-2">{metric.method}</p>
                  <p className="text-2xl font-bold">{metric.calls.toLocaleString()}</p>
                  <p className="text-sm text-green-500">{metric.growth} last 30d</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="text-md font-semibold mb-3">Webhook Event Distribution</h4>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { event: 'erc20_transfer', count: 12500 },
                  { event: 'erc721_transfer', count: 3200 },
                  { event: 'transaction', count: 8900 }
                ].map((event) => (
                  <div key={event.event} className="bg-gray-50 p-4 rounded-xl">
                    <p className="font-mono text-sm mb-2">{event.event}</p>
                    <p className="text-xl font-bold">{event.count.toLocaleString()}</p>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                      <div
                        className="bg-blue-500 h-1 rounded-full"
                        style={{ width: `${(event.count / 15000) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-6">
          {/* Transaction History */}
          <div className="card rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">Transaction History</h2>
                <p className="text-sm text-gray-400">All on-chain activity</p>
              </div>
              <select className="bg-white border border-gray-200 rounded-lg px-3 py-1 text-sm">
                <option>All Transactions</option>
                <option>Points Only</option>
                <option>NFT Activity</option>
              </select>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: '0x1234...5678',
                  description: 'Daily login bonus',
                  timestamp: '2024-03-20T06:00:00',
                  type: 'earn',
                  points: 100,
                  status: 'completed',
                  network: 'Base Mainnet',
                  txHash: '0x789...012'
                },
                {
                  id: '0x2345...6789',
                  description: 'NFT Tier Upgrade - Silver',
                  timestamp: '2024-03-19T15:30:00',
                  type: 'tier_upgrade',
                  points: 0,
                  status: 'completed',
                  network: 'Base Mainnet',
                  txHash: '0x345...678'
                },
                {
                  id: '0x3456...7890',
                  description: 'Reward Redemption - CDP Pro Access',
                  timestamp: '2024-03-19T14:20:00',
                  type: 'redeem',
                  points: -500,
                  status: 'completed',
                  network: 'Base Mainnet',
                  txHash: '0x901...234'
                },
                {
                  id: '0x4567...8901',
                  description: 'Referral Bonus Pending',
                  timestamp: '2024-03-19T12:00:00',
                  type: 'earn',
                  points: 200,
                  status: 'pending',
                  network: 'Base Mainnet',
                  txHash: 'Pending...'
                }
              ].map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 card rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      tx.type === 'earn' ? 'bg-green-100' :
                      tx.type === 'redeem' ? 'bg-red-100' :
                      'bg-blue-100'
                    }`}>
                      {tx.type === 'earn' ? '↑' : tx.type === 'redeem' ? '↓' : '↔'}
                    </div>
                    <div>
                      <p className="font-semibold">{tx.description}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span>{new Date(tx.timestamp).toLocaleString()}</span>
                        <span>•</span>
                        <span className="font-mono">{tx.txHash}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {tx.points !== 0 && (
                      <p className={`font-bold ${tx.points > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {tx.points > 0 ? '+' : ''}{tx.points} pts
                      </p>
                    )}
                    <span className={`text-sm ${
                      tx.status === 'completed' ? 'text-green-500' :
                      tx.status === 'pending' ? 'text-yellow-500' :
                      'text-red-500'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tier Progression */}
          <div className="card rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">Tier Progression</h2>
            <div className="relative">
              <div className="absolute left-6 h-full w-px bg-gray-200" />
              <div className="space-y-6">
                {[
                  {
                    level: 'Silver',
                    achievedDate: '2024-02-27',
                    nftId: '0x345...678',
                    points: 750,
                    txHash: '0x901...234'
                  },
                  {
                    level: 'Bronze',
                    achievedDate: '2024-01-14',
                    nftId: '0x789...012',
                    points: 250,
                    txHash: '0x567...890'
                  }
                ].map((tier, index) => (
                  <div key={index} className="relative flex items-start ml-6 pl-6">
                    <div className="absolute -left-3 mt-1.5 w-6 h-6 rounded-full border-4 border-white bg-blue-500" />
                    <div className="flex-grow card p-4 rounded-xl">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{tier.level} Tier Achieved</p>
                          <p className="text-sm text-gray-400">
                            {new Date(tier.achievedDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-400 font-mono mt-1">
                            TX: {tier.txHash}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">NFT ID</p>
                          <p className="font-mono text-xs">{tier.nftId}</p>
                          <p className="text-sm font-semibold mt-1">{tier.points} points</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'system' && <SystemInfo />}

      {activeTab === 'earn' && (
        <div className="space-y-8">
          {/* Current Progress */}
          <div className="card p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Current Tier: {dummyUserData.tier.current}</h2>
                <p className="text-gray-400">Progress to {dummyUserData.tier.next}</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold">{dummyUserData.points.balance}</p>
                <p className="text-sm text-gray-400">Current Points</p>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all"
                style={{ width: `${(dummyUserData.tier.progress / dummyUserData.tier.nextThreshold) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">
              {dummyUserData.tier.progress} / {dummyUserData.tier.nextThreshold} points
            </p>
          </div>

          {/* Earning Categories */}
          <div className="flex space-x-4 mb-6">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">All Tasks</button>
            <button className="px-4 py-2 rounded-lg card hover:bg-opacity-80">Daily</button>
            <button className="px-4 py-2 rounded-lg card hover:bg-opacity-80">Social</button>
            <button className="px-4 py-2 rounded-lg card hover:bg-opacity-80">Trading</button>
          </div>

          {/* Daily Tasks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">Daily Check-in</h3>
                  <p className="text-sm text-gray-400">Login daily to earn points</p>
                </div>
                <span className="text-green-500 font-semibold">+50 pts</span>
              </div>
              <button className="w-full py-2 bg-blue-600 rounded-lg text-white">Check In Now</button>
            </div>

            <div className="card p-6 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">Refer Friends</h3>
                  <p className="text-sm text-gray-400">Invite friends to join</p>
                </div>
                <span className="text-green-500 font-semibold">+200 pts</span>
              </div>
              <button className="w-full py-2 bg-blue-600 rounded-lg text-white">Refer Now</button>
            </div>

            <div className="card p-6 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">First Trade</h3>
                  <p className="text-sm text-gray-400">Complete your first trade</p>
                </div>
                <span className="text-green-500 font-semibold">+100 pts</span>
              </div>
              <button className="w-full py-2 bg-blue-600 rounded-lg text-white">Start Trading</button>
            </div>
          </div>

          {/* Social Tasks */}
          <div className="card p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Social Challenges</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-500/10 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">🐦</span>
                  <div>
                    <h4 className="font-semibold">Share on Twitter</h4>
                    <p className="text-sm text-gray-400">Share your achievements</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 rounded-lg text-white">+75 pts</button>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-500/10 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">📱</span>
                  <div>
                    <h4 className="font-semibold">Follow on Discord</h4>
                    <p className="text-sm text-gray-400">Join our community</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 rounded-lg text-white">+50 pts</button>
              </div>
            </div>
          </div>

          {/* Trading Challenges */}
          <div className="card p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Trading Challenges</h3>
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Trade Volume Challenge</h4>
                    <p className="text-sm text-gray-400">Trade $1000 worth of tokens</p>
                    <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Progress: $600 / $1000</p>
                  </div>
                  <div className="text-right">
                    <span className="text-green-500 font-semibold">+500 pts</span>
                    <p className="text-xs text-gray-400">on completion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'store' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Rewards Store</h2>
              <p className="text-gray-400">Redeem your points for exclusive rewards</p>
            </div>
            <div className="bg-blue-500/10 px-6 py-3 rounded-xl">
              <p className="text-sm text-gray-400">Available Balance</p>
              <p className="text-2xl font-bold">{dummyUserData.points.balance} pts</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 rounded-lg text-white">All Rewards</button>
            <button className="px-4 py-2 card rounded-lg">NFTs</button>
            <button className="px-4 py-2 card rounded-lg">Tokens</button>
            <button className="px-4 py-2 card rounded-lg">Badges</button>
            <button className="px-4 py-2 card rounded-lg">Access Passes</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gold Tier NFT */}
            <div className="card p-6 rounded-xl">
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 aspect-square rounded-xl flex items-center justify-center mb-4">
                <span className="text-6xl">👑</span>
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">Gold Tier NFT</h3>
                    <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-xs rounded-full">Legendary</span>
                  </div>
                  <p className="text-sm text-gray-400">Unlock exclusive Gold tier benefits</p>
                </div>
                <p className="font-bold">1000 pts</p>
              </div>
              <button className="w-full py-2 bg-gray-700 rounded-lg text-white opacity-50 cursor-not-allowed">
                Insufficient Points
              </button>
            </div>

            {/* CDP Pro Access */}
            <div className="card p-6 rounded-xl">
              <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 aspect-square rounded-xl flex items-center justify-center mb-4">
                <span className="text-6xl">🎫</span>
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">CDP Pro Access</h3>
                    <span className="px-2 py-1 bg-purple-500/10 text-purple-500 text-xs rounded-full">Rare</span>
                  </div>
                  <p className="text-sm text-gray-400">Enhanced CDP features access</p>
                </div>
                <p className="font-bold">500 pts</p>
              </div>
              <button className="w-full py-2 bg-blue-600 rounded-lg text-white">Redeem Now</button>
            </div>

            {/* Base Explorer Badge */}
            <div className="card p-6 rounded-xl">
              <div className="bg-gradient-to-br from-blue-500/10 to-green-500/10 aspect-square rounded-xl flex items-center justify-center mb-4">
                <span className="text-6xl">👑</span>
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">Explorer Badge</h3>
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded-full">Limited</span>
                  </div>
                  <p className="text-sm text-gray-400">Verified Base Registry member</p>
                </div>
                <p className="font-bold">250 pts</p>
              </div>
              <button className="w-full py-2 bg-blue-600 rounded-lg text-white">Redeem Now</button>
            </div>
          </div>
        </div>

      )}
    </div>
  );
}
