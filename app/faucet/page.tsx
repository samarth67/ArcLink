"use client";

import { useAccount } from "wagmi";

export default function FaucetPage() {
  const { address, isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">Faucet Hub</h1>
      <p className="text-gray-400 mb-10">
        Claim free Arc Testnet USDC to test the platform.
      </p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-xl">
        {isConnected ? (
          <>
            <p className="text-sm text-gray-400 mb-2">Your Address</p>
            <p className="font-mono text-lg mb-6 break-all">{address}</p>

            <a
              href="https://faucet.circle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-medium transition"
            >
              Claim Testnet USDC
            </a>

            <p className="text-sm text-gray-500 mt-6">
              Official Circle Faucet se USDC claim karo. Network me Arc Testnet select karna mat bhoolna.
            </p>
          </>
        ) : (
          <p className="text-gray-400">Please connect your wallet first.</p>
        )}
      </div>
    </div>
  );
}