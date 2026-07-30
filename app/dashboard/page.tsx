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
      <div className="min-h-screen flex items-center justify-center text-white">
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
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="relative border-b border-zinc-800 px-8 py-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
        <h1 className="relative text-3xl font-bold bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
          Portfolio Dashboard
        </h1>
        <p className="relative text-gray-400 text-sm mt-1">Arc Testnet Overview</p>
      </div>

      <div className="p-8 max-w-6xl mx-auto">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/20 to-blue-900/10 p-6 backdrop-blur shadow-[0_0_25px_rgba(37,99,235,0.1)]">
            <p className="text-sm text-blue-300 mb-2">Total Balance</p>
            <h2 className="text-4xl font-bold">{usdcBalance} USDC</h2>
            <p className="text-sm text-gray-400 mt-2">≈ ${usdcBalance}</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur transition hover:border-zinc-700">
            <p className="text-sm text-gray-400 mb-2">Network</p>
            <h2 className="text-2xl font-bold text-green-400">
              {chainId === 5042002 ? "Arc Testnet" : `Chain ${chainId}`}
            </h2>
            <p className="text-sm text-gray-500 mt-2">Connected</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur transition hover:border-zinc-700">
            <p className="text-sm text-gray-400 mb-2">Wallet</p>
            <h2 className="text-lg font-mono truncate">{address}</h2>
            <p className="text-sm text-gray-500 mt-2">Active</p>
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur">
          <h3 className="text-xl font-semibold mb-6">Assets</h3>

          <div className="flex items-center justify-between py-4 border-b border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)]">
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

          <div className="mt-8 text-center text-gray-500 text-sm">
            More tokens will appear here as you use ArcLink
          </div>
        </div>
      </div>
    </div>
  );
}