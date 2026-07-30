"use client";

import { useAccount, useBalance, useChainId } from "wagmi";
import { formatEther } from "viem";

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balance } = useBalance({
    address: address,
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3">Profile</h1>
          <p className="text-gray-400">Please connect your wallet first</p>
        </div>
      </div>
    );
  }

  const usdcBalance = balance
    ? Number(formatEther(balance.value)).toFixed(4)
    : "0.0000";

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 px-8 py-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-400 text-sm mt-1">Your on-chain identity</p>
      </div>

      <div className="p-8 max-w-3xl mx-auto">
        {/* Profile Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
              {address ? address.slice(2, 4).toUpperCase() : "A"}
            </div>

            <div>
              <h2 className="text-2xl font-bold">{shortAddress}</h2>
              <p className="text-gray-400 text-sm mt-1">Arc Testnet User</p>
              <p className="text-xs text-gray-500 mt-2 font-mono break-all">
                {address}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <p className="text-sm text-gray-400 mb-2">Balance</p>
            <p className="text-3xl font-bold">{usdcBalance} USDC</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <p className="text-sm text-gray-400 mb-2">Network</p>
            <p className="text-3xl font-bold text-green-400">
              {chainId === 5042002 ? "Arc Testnet" : `Chain ${chainId}`}
            </p>
          </div>
        </div>

        <div className="mt-10 text-center text-gray-500 text-sm">
          Reputation score, badges aur activity history jald aaega
        </div>
      </div>
    </div>
  );
}