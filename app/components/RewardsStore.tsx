import { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

interface Reward {
  id: number;
  name: string;
  description: string;
  cost: number;
  image: string;
  type: 'nft' | 'token' | 'badge' | 'utility' | 'premium' | 'developer';
  rarity: 'Common' | 'Rare' | 'Legendary' | 'Limited' | 'Utility' | 'Premium' | 'Developer';
  stock: number;
}

export default function RewardsStore() {
  const [rewards] = useState<Reward[]>([
    {
      id: 1,
      name: 'Gold Tier NFT',
      description: 'Unlock exclusive Gold tier benefits',
      cost: 1000,
      image: '/nft-preview.png',
      type: 'nft',
      rarity: 'Legendary',
      stock: 10
    },
    {
      id: 2,
      name: 'CDP Pro Access',
      description: 'Enhanced CDP features access',
      cost: 500,
      image: '/token-preview.png',
      type: 'token',
      rarity: 'Rare',
      stock: 100
    },
    {
      id: 3,
      name: 'Early Adopter Badge',
      description: 'Verified Base Registry member',
      cost: 250,
      image: '/badge-preview.png',
      type: 'badge',
      rarity: 'Limited',
      stock: 1000
    },
    {
      id: 4,
      name: 'Network Pass',
      description: 'Access to Base Mainnet & Sepolia',
      cost: 400,
      image: '/network-preview.png',
      type: 'utility',
      rarity: 'Utility',
      stock: 500
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rewards.map(reward => (
          <div key={reward.id} className="card p-6 rounded-xl">
            <div className="bg-gradient-to-br aspect-square rounded-xl flex items-center justify-center mb-4 ${
              reward.type === 'nft' ? 'from-yellow-500/10 to-orange-500/10' :
              reward.type === 'token' ? 'from-purple-500/10 to-blue-500/10' :
              reward.type === 'badge' ? 'from-blue-500/10 to-green-500/10' :
              reward.type === 'utility' ? 'from-green-500/10 to-teal-500/10' :
              reward.type === 'premium' ? 'from-indigo-500/10 to-purple-500/10' :
              'from-cyan-500/10 to-blue-500/10'
            }">
              <span className="text-6xl">
                {reward.type === 'nft' ? '🏆' :
                 reward.type === 'token' ? '🎫' :
                 reward.type === 'badge' ? '🏅' :
                 reward.type === 'utility' ? '🌐' :
                 reward.type === 'premium' ? '🔍' : '🔑'}
              </span>
            </div>

            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{reward.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    reward.rarity === 'Legendary' ? 'bg-yellow-500/10 text-yellow-500' :
                    reward.rarity === 'Rare' ? 'bg-purple-500/10 text-purple-500' :
                    reward.rarity === 'Limited' ? 'bg-blue-500/10 text-blue-500' :
                    reward.rarity === 'Utility' ? 'bg-green-500/10 text-green-500' :
                    reward.rarity === 'Premium' ? 'bg-indigo-500/10 text-indigo-500' :
                    'bg-cyan-500/10 text-cyan-500'
                  }`}>
                    {reward.rarity}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{reward.description}</p>
              </div>
              <p className="font-bold">{reward.cost} pts</p>
            </div>

            <button className={`w-full py-2 rounded-lg text-white ${
              reward.cost > 750 ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600'
            }`}>
              {reward.cost > 750 ? 'Insufficient Points' : 'Redeem Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
