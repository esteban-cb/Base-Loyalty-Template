//import TransactionHistory from './TransactionHistory';

// CDP Integration
export const cdpData = {
  balances: {
    erc20: [
      { token: 'LOYALTY', balance: '750', network: 'base' },
      { token: 'LOYALTY', balance: '250', network: 'base-sepolia' }
    ],
    erc721: [
      { tokenId: '0x789...012', collection: 'TIER_NFT', tier: 'Bronze' },
      { tokenId: '0x345...678', collection: 'TIER_NFT', tier: 'Silver' }
    ]
  },
  basename: {
    name: 'crypto.base',
    registryAddress: '0xabc...def',
    registrationDate: '2024-01-01',
    networks: ['base', 'base-sepolia']
  }
};

// Smart Contract Data
export const contractData = {
  loyaltyToken: {
    address: '0x123...456',
    symbol: 'LOYALTY',
    decimals: 18,
    totalSupply: '1000000'
  },
  tierNFT: {
    address: '0x789...012',
    name: 'Base Loyalty Tiers',
    symbol: 'TIER',
    tiers: {
      Bronze: { threshold: 0, uri: 'ipfs://bronze' },
      Silver: { threshold: 500, uri: 'ipfs://silver' },
      Gold: { threshold: 1000, uri: 'ipfs://gold' }
    }
  },
  rewardSystem: {
    address: '0xdef...789',
    rewards: [
      { id: 1, type: 'nft', cost: 1000, contract: '0xaaa...bbb' },
      { id: 2, type: 'token', cost: 500, contract: '0xccc...ddd' }
    ]
  }
};

// Real-time Event Data
export const eventData = {
  webhooks: [
    {
      type: 'erc20_transfer',
      network: 'base',
      from: '0x111...222',
      to: '0x333...444',
      amount: '100',
      timestamp: new Date().toISOString()
    },
    {
      type: 'erc721_transfer',
      network: 'base',
      tokenId: '0x789...012',
      from: '0x000...000',
      to: '0x333...444',
      timestamp: new Date().toISOString()
    }
  ],
  balanceUpdates: {
    lastUpdate: new Date().toISOString(),
    changes: [
      { token: 'LOYALTY', old: '650', new: '750', reason: 'Daily Login' },
      { token: 'TIER_NFT', old: 'Bronze', new: 'Silver', reason: 'Tier Upgrade' }
    ]
  }
};

// Analytics Data
export const analyticsData = {
  historical: {
    daily: [
      { date: '2024-03-19', points: 650, transactions: 3, engagement: 75 },
      { date: '2024-03-20', points: 750, transactions: 5, engagement: 85 }
    ],
    monthly: [
      { month: '2024-02', avgPoints: 450, totalTransactions: 45, avgEngagement: 70 },
      { month: '2024-03', avgPoints: 700, totalTransactions: 60, avgEngagement: 80 }
    ]
  },
  networks: {
    'base': { active: true, lastSync: new Date().toISOString() },
    'base-sepolia': { active: true, lastSync: new Date().toISOString() }
  },
  redemption: {
    history: [
      {
        id: 'red_1',
        reward: 'Exclusive NFT',
        cost: 1000,
        date: '2024-03-15',
        status: 'completed',
        txHash: '0x999...888'
      }
    ],
    analytics: {
      popularRewards: ['NFTs', 'Access Tokens'],
      avgRedemptionTime: '3.5 days',
      successRate: '98.5%'
    }
  }
};

export const dummyUserData = {
  stats: {
    community: {
      totalUsers: 15423,
      last24h: 342,
      weeklyGrowth: '+15.2%',
      monthlyGrowth: '+42.8%',
      activeRegions: [
        { name: 'North America', users: 5241 },
        { name: 'Europe', users: 4832 },
        { name: 'Asia', users: 3891 }
      ]
    },
    pointsEconomy: {
      totalPoints: '1.2M',
      redemptionRate: '85%',
      averageHolding: 780,
      distribution: {
        rewards: '45%',
        referrals: '30%',
        engagement: '25%'
      }
    },
    engagement: {
      score: 78,
      growth: '+12%',
      breakdown: {
        daily: 82,
        weekly: 75,
        monthly: 78
      }
    }
  },
  topMembers: [
    {
      rank: 1,
      basename: 'crypto.king',
      points: 15000,
      tier: 'Gold',
      joinDate: '2024-01-15',
      achievements: 12
    },
    {
      rank: 2,
      basename: 'nft.wizard',
      points: 12500,
      tier: 'Gold',
      joinDate: '2024-01-20',
      achievements: 10
    },
    {
      rank: 3,
      basename: 'base.chad',
      points: 11000,
      tier: 'Silver',
      joinDate: '2024-02-01',
      achievements: 8
    }
  ],
  recentActivity: [
    {
      id: '1',
      type: 'point_earn',
      description: 'Daily login streak bonus',
      timestamp: '2024-03-20T08:25:43Z',
      points: 100,
      status: 'completed'
    },
    {
      id: '2',
      type: 'achievement',
      description: 'First NFT Purchase',
      timestamp: '2024-03-20T07:15:22Z',
      points: 250,
      status: 'completed'
    },
    {
      id: '3',
      type: 'referral',
      description: 'Referred web3.dev',
      timestamp: '2024-03-19T22:45:12Z',
      points: 500,
      status: 'pending'
    }
  ]
};
