import { cdpData, contractData } from '../lib/dummyData';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function SystemInfo() {
  return (
    <div className="space-y-8">
      {/* Registration & Identity */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Registration & Identity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Wallet Integration</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-secondary">Provider</span>
                <span className="font-medium">Coinbase Wallet</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary">Networks</span>
                <span className="font-medium">{cdpData.basename.networks.join(', ')}</span>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Base Identity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-secondary">Basename</span>
                <span className="font-medium">{cdpData.basename.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary">Registry</span>
                <span className="font-mono text-sm">{cdpData.basename.registryAddress}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Contracts */}
      <div className="bg-gradient-to-br from-green-500/10 to-yellow-500/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Smart Contracts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-green-400">Loyalty Token (ERC20)</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-secondary">Symbol</span>
                <span className="font-medium">{contractData.loyaltyToken.symbol}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary">Address</span>
                <span className="font-mono text-sm">{contractData.loyaltyToken.address}</span>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Tier NFTs (ERC721)</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-secondary">Collection</span>
                <span className="font-medium">{contractData.tierNFT.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary">Address</span>
                <span className="font-mono text-sm">{contractData.tierNFT.address}</span>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Reward System</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-secondary">Address</span>
                <span className="font-mono text-sm">{contractData.rewardSystem.address}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary">Active Rewards</span>
                <span className="font-medium">{contractData.rewardSystem.rewards.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CDP Integration */}
      <div className="bg-gradient-to-br from-pink-500/10 to-blue-500/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">CDP Integration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-pink-400">Active Methods</h3>
            <div className="space-y-3">
              {['cdp_listBalances', 'cdp_listAddressTransactions', 'cdp_listBalanceHistories'].map((method) => (
                <div key={method} className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-400" />
                  <span className="font-mono text-sm">{method}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Webhook Events</h3>
            <div className="space-y-3">
              {['erc20_transfer', 'erc721_transfer', 'transaction'].map((event) => (
                <div key={event} className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-400" />
                  <span className="font-mono text-sm">{event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
