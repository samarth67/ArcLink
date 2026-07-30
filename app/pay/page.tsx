"use client";

import { useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";

export default function PayPage() {
  const searchParams = useSearchParams();

  const { isConnected } = useAccount();

  const receiver = searchParams.get("to");
  const amount = searchParams.get("amount");
  const note = searchParams.get("note");

  return (
    <div className="min-h-screen text-white">

      {/* Header */}

      <div className="relative border-b border-zinc-800 px-8 py-10 overflow-hidden">

        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full" />

        <h1 className="relative text-3xl font-bold bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
          Pay Request
        </h1>

        <p className="relative text-gray-400 mt-2">
          Complete your USDC payment
        </p>

      </div>

      <div className="max-w-2xl mx-auto p-8">

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur p-8">

          <h2 className="text-2xl font-bold mb-8">
            Payment Details
          </h2>

          <div className="space-y-6">

            <div>

              <p className="text-gray-400 text-sm">
                Amount
              </p>

              <h2 className="text-4xl font-bold text-blue-400">
                {amount || "0"} USDC
              </h2>

            </div>

            <div>

              <p className="text-gray-400 text-sm">
                Payment Note
              </p>

              <p className="text-lg">
                {note || "No note"}
              </p>

            </div>

            <div>

              <p className="text-gray-400 text-sm">
                Receiver Wallet
              </p>

              <p className="font-mono break-all">
                {receiver}
              </p>

            </div>
                        {!isConnected ? (

              <div className="mt-8 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-5">

                <p className="text-yellow-300 text-center">
                  Please connect your wallet to continue.
                </p>

              </div>

            ) : (

              <button
                className="w-full mt-8 rounded-xl bg-blue-600 hover:bg-blue-700 transition py-4 text-lg font-semibold"
                onClick={() => alert("USDC transfer will be added in next step 🚀")}
              >
                Pay Now
              </button>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}