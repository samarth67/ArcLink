"use client";

import { useAccount, useBalance, useChainId } from "wagmi";
import { formatEther } from "viem";

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balance } = useBalance({
    address: address,
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3">Dashboard</h1>
          <p className="text-gray-400">Please connect your wallet first</p>
        </div>
      </div>
    );
  }

  const usdcBalance = balance
    ? Number(formatEther(balance.value)).toFixed(4)
    : "0.0000";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 px-8 py-6">
        <h1 className="text-2xl font-bold">Portfolio Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Arc Testnet Overview</p>
      </div>

      <div className="p-8 max-w-6xl mx-auto">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Total Balance */}
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/10 border border-blue-500/30 rounded-3xl p-6">
            <p className="text-sm text-blue-300 mb-2">Total Balance</p>
            <h2 className="text-4xl font-bold">{usdcBalance} USDC</h2>
            <p className="text-sm text-gray-400 mt-2">≈ ${usdcBalance}</p>
          </div>

          {/* Network */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <p className="text-sm text-gray-400 mb-2">Network</p>
            <h2 className="text-2xl font-bold text-green-400">
              {chainId === 5042002 ? "Arc Testnet" : `Chain ${chainId}`}
            </h2>
            <p className="text-sm text-gray-500 mt-2">Connected</p>
          </div>

          {/* Wallet */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <p className="text-sm text-gray-400 mb-2">Wallet</p>
            <h2 className="text-lg font-mono truncate">{address}</h2>
            <p className="text-sm text-gray-500 mt-2">Active</p>
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <h3 className="text-xl font-semibold mb-6">Assets</h3>

          <div className="flex items-center justify-between py-4 border-b border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                $
              </div>
              <div>
                <p className="font-medium">USDC</p>
                <p className="text-sm text-gray-400">USD Coin</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{usdcBalance}</p>
              <p className="text-sm text-gray-400">${usdcBalance}</p>
            </div>
          </div>

          {/* Empty state for future tokens */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            More tokens will appear here as you use ArcLink
          </div>
        </div>
      </div>
    </div>
  );
}