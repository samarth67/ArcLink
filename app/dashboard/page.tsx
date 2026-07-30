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
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p className="text-gray-400">Please connect your wallet first</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-10">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Address Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-gray-400 text-sm mb-2">Wallet Address</h2>
          <p className="text-lg font-mono break-all">{address}</p>
        </div>

        {/* Balance Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-gray-400 text-sm mb-2">Balance</h2>
          <p className="text-2xl font-bold">
            {balance
              ? `${Number(formatEther(balance.value)).toFixed(4)} ${balance.symbol}`
              : "Loading..."}
          </p>
        </div>

        {/* Network Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-gray-400 text-sm mb-2">Network</h2>
          <p className="text-2xl font-bold">
            {chainId === 5042002 ? "Arc Testnet" : `Chain ID: ${chainId}`}
          </p>
        </div>
      </div>
    </div>
  );
}