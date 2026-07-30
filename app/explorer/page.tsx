"use client";

import { useAccount } from "wagmi";

export default function ExplorerPage() {
  const { address, isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">Transaction Explorer</h1>
      <p className="text-gray-400 mb-10">
        View your transactions and activity on Arc Testnet.
      </p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-xl">
        {isConnected ? (
          <>
            <p className="text-sm text-gray-400 mb-2">Your Address</p>
            <p className="font-mono text-lg mb-6 break-all">{address}</p>

            <a
              href={`https://testnet.arcscan.app/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-medium transition"
            >
              View on ArcScan
            </a>

            <p className="text-sm text-gray-500 mt-6">
              Official Arc Testnet Explorer pe apna address check karo.
            </p>
          </>
        ) : (
          <p className="text-gray-400">Please connect your wallet first.</p>
        )}
      </div>
    </div>
  );
}