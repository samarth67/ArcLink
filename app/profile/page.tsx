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
      <div className="min-h-screen text-white flex items-center justify-center">
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
    <div className="min-h-screen text-white">
      <div className="relative border-b border-zinc-800 px-8 py-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
        <h1 className="relative text-3xl font-bold bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
          Profile
        </h1>
        <p className="relative text-gray-400 text-sm mt-1">Your on-chain identity</p>
      </div>

      <div className="p-8 max-w-3xl mx-auto">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur p-8 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold shadow-lg">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur p-6">
            <p className="text-sm text-gray-400 mb-2">Balance</p>
            <p className="text-3xl font-bold bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              {usdcBalance} USDC
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur p-6">
            <p className="text-sm text-gray-400 mb-2">Network</p>
            <p className="text-3xl font-bold text-green-400">
              {chainId === 5042002 ? "Arc Testnet" : `Chain ${chainId}`}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur p-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-xl mx-auto mb-4 shadow-lg">
            🏆
          </div>
          <p className="text-gray-400 text-sm">
            Reputation score, badges aur activity history jald aaega
          </p>
        </div>
      </div>
    </div>
  );
}
