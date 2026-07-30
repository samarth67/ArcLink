"use client";

import { useAccount, useBalance } from "wagmi";
import { formatEther } from "viem";

export default function FaucetPage() {
  const { address, isConnected } = useAccount();
  const { data: balance, refetch } = useBalance({
    address: address,
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden text-white">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900/50 p-10 text-center backdrop-blur">
        <h1 className="text-3xl font-bold mb-3 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
          Arc Testnet Faucet
        </h1>
        <p className="text-gray-400 mb-8">
          Get free USDC to test ArcLink features
        </p>

        {isConnected ? (
          <>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5 mb-6">
              <p className="text-sm text-gray-400 mb-1">Your Balance</p>
              <p className="text-3xl font-bold">
                {balance ? Number(formatEther(balance.value)).toFixed(4) + " USDC" : "0.0000 USDC"}
              </p>
            </div>

            <p className="text-sm text-gray-500 mb-6 break-all">{address}</p>

            <a href="https://faucet.circle.com" target="_blank" rel="noopener noreferrer" className="block w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold shadow-lg transition hover:bg-blue-500 hover:-translate-y-0.5 mb-4">Claim Free USDC</a>

            <button onClick={() => refetch()} className="w-full rounded-2xl border border-zinc-800 py-3 text-sm transition hover:bg-zinc-800">
              Refresh Balance
            </button>

            <p className="text-xs text-gray-500 mt-6">
              Claim ke baad yahan aake Refresh Balance dabao. Network me Arc Testnet selected hona chahiye.
            </p>
          </>
        ) : (
          <p className="text-gray-400">Please connect your wallet first</p>
        )}
      </div>
    </div>
  );
}