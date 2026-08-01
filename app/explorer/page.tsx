"use client";

import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

type Transaction = {
  transaction_hash: string;
  timestamp: string | null;
  method: string | null;
  type: string;

  from: {
    hash: string;
  };

  to: {
    hash: string;
  } | null;

  token: {
    symbol?: string;
    decimals: string;
  };

  total: {
    value: string;
    decimals: string;
  };
};

export default function ExplorerPage() {
  const { address, isConnected } = useAccount();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchTransactions() {
    if (!address) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://testnet.arcscan.app/api/v2/addresses/${address}/token-transfers`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      console.log(data);

      setTransactions(data.items || []);
    } catch (err) {
      console.error(err);
      setError("Could not load transactions.");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isConnected && address) {
      fetchTransactions();
    }
  }, [isConnected, address]);

  function formatAddress(addr: string) {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }

  function formatValue(tx: Transaction) {
    const decimals = Number(tx.total.decimals);
    const amount = Number(tx.total.value) / Math.pow(10, decimals);

    return `${amount.toFixed(2)} ${tx.token.symbol || "USDC"}`;
  }

  return (
    <div className="min-h-screen text-white">
      <div className="relative border-b border-zinc-800 px-8 py-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

        <h1 className="relative text-4xl font-bold bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
  🔍 Arc Explorer
</h1>

<p className="relative text-gray-400 text-sm mt-2">
  View real-time on-chain transactions powered by Arc Testnet.
</p>
      </div>

      <div className="p-8 max-w-3xl mx-auto">
        {isConnected ? (
          <>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">

                <div>
                  <p className="text-sm text-gray-400 mb-1">
                    Wallet Address
                  </p>

                  <p className="text-sm text-gray-300 font-mono break-all">
                    {address}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={fetchTransactions}
                    disabled={loading}
                    className="rounded-xl bg-zinc-800 px-5 py-2.5 text-sm font-semibold transition hover:bg-zinc-700 disabled:opacity-50"
                  >
                    {loading ? "Refreshing..." : "Refresh"}
                  </button>

                  <a
                    href={`https://testnet.arcscan.app/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold shadow-lg transition hover:bg-blue-500"
                  >
                    Open in ArcScan →
                  </a>
                </div>

              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur overflow-hidden">

              <div className="px-6 py-4 border-b border-zinc-800">
                <h2 className="text-lg font-bold">
                  Recent Transactions
                </h2>
              </div>

              {loading && transactions.length === 0 ? (

                <p className="text-center py-12 text-gray-400">
                  Loading transactions...
                </p>

              ) : error ? (

                <div className="text-center py-12">
                  <p className="text-red-400 mb-2">
                    {error}
                  </p>

                  <a
                    href={`https://testnet.arcscan.app/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    View on ArcScan
                  </a>
                </div>

              ) : transactions.length === 0 ? (

                <p className="text-center py-12 text-gray-400">
                  No transactions found.
                </p>

              ) : (

                <div className="divide-y divide-zinc-800">

                  {transactions.map((tx) => {

                    const isReceived =
                      tx.to?.hash?.toLowerCase() ===
                      address?.toLowerCase();

                    return (
                      <a
                        key={tx.transaction_hash}
                        href={`https://testnet.arcscan.app/tx/${tx.transaction_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-6 py-4 hover:bg-zinc-800/50 transition"
                      >
                        <div>

                          <p className="font-mono text-sm text-blue-400">
                            {formatAddress(tx.transaction_hash)}
                          </p>

                          <p
                            className={`text-xs mt-1 ${
                              isReceived
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {isReceived
                              ? "Received"
                              : "Sent"}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {tx.timestamp
                              ? new Date(tx.timestamp).toLocaleString()
                              : "Pending"}
                          </p>

                        </div>

                        <div className="text-right">

                          <p
                            className={`text-sm font-semibold ${
                              isReceived
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {isReceived ? "+" : "-"}
                            {formatValue(tx)}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            Completed
                          </p>

                        </div>

                      </a>
                    );
                  })}

                </div>

              )}
            </div>

          </>

        ) : (

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 text-center backdrop-blur">

            <p className="text-gray-400">
              Please connect your wallet first
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Connect your wallet using the button in the top-right corner to
              view your transaction history.
            </p>

          </div>

        )}
      </div>
    </div>
  );
}