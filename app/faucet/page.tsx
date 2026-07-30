"use client";

import { useAccount, useBalance } from "wagmi";
import { formatEther } from "viem";

export default function FaucetPage() {
  const { address, isConnected } = useAccount();
  const { data: balance, refetch } = useBalance({
    address: address,
  });

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">
        
        <h1 className="text-3xl font-bold mb-3">Arc Testnet Faucet</h1>
        <p className="text-gray-400 mb-8">
          Get free USDC to test ArcLink features
        </p>

        {isConnected ? (
          <>
            {/* Balance */}
            <div className="bg-zinc-800 rounded-2xl p-5 mb-6">
              <p className="text-sm text-gray-400 mb-1">Your Balance</p>
              <p className="text-3xl font-bold">
                {balance
                  ? `${Number(formatEther(balance.value)).toFixed(4)} USDC`
                  : "0.0000 USDC"}
              </p>
            </div>

            {/* Address */}
            <p className="text-sm text-gray-500 mb-6 break-all">
              {address}
            </p>

            {/* Claim Button */}
            <a
              href="https://faucet.circle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl font-semibold text-lg mb-4"
            >
              Claim Free USDC
            </a>

            {/* Refresh Button */}
            <button
              onClick={() => refetch()}
              className="w-full border border-zinc-700 hover:bg-zinc-800 transition py-3 rounded-2xl text-sm"
            >
              Refresh Balance
            </button>

            <p className="text-xs text-gray-500 mt-6">
              Claim ke baad yahan aake “Refresh Balance” dabao.
              Network me Arc Testnet selected hona chahiye.
            </p>
          </>
        ) : (
          <p className="text-gray-400">Please connect your wallet first</p>
        )}
      </div>
    </div>
  );
}