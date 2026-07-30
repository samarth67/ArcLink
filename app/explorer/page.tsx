"use client";

import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

type Transaction = {
  hash: string;
  timestamp: string | null;
  method: string | null;
  status: string;
  from: { hash: string };
  to: { hash: string } | null;
  value: string;
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
        `https://testnet.arcscan.app/api/v2/addresses/${address}/transactions`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      setTransactions(data.items || []);
    } catch (err) {
      setError("Could not load transactions. Please try again.");
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
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  }

  function formatValue(value: string) {
    const usdc = Number(value) / 1e18;
    return usdc.toFixed(4) + " USDC";
  }

  function formatTime(timestamp: string | null) {
    if (!timestamp) return "Pending";
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className="min-h-screen text-white">
      <div className="relative border-b border-zinc-800 px-8 py-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
        <h1 className="relative text-3xl font-bold bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
          Explorer
        </h1>
        <p className="relative text-gray-400 text-sm mt-1">Track your activity on Arc</p>
      </div>

      <div className="p-8 max-w-3xl mx-auto">
        {isConnected ? (
          <>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Wallet Address</p>
                  <p className="text-sm text-gray-300 font-mono break-all">{address}</p>
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
                    href={"https://testnet.arcscan.app/address/" + address}
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
                <h2 className="text-lg font-bold">Recent Transactions</h2>
              </div>

              {loading && transactions.length === 0 ? (
                <p className="text-gray-400 text-center py-12">Loading transactions...</p>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-400 mb-2">{error}</p>
                  <p className="text-gray-500 text-sm">
                    You can still view your full history on{" "}
                    <a
                      href={"https://testnet.arcscan.app/address/" + address}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      ArcScan
                    </a>
                  </p>
                </div>
              ) : transactions.length === 0 ? (
                <p className="text-gray-400 text-center py-12">
                  No transactions found yet. Once you send or receive USDC, they will show up here.
                </p>
              ) : (
                <div className="divide-y divide-zinc-800">
                  {transactions.map((tx) => (
                    <a
                      key={tx.hash}
                      href={"https://testnet.arcscan.app/tx/" + tx.hash}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-6 py-4 hover:bg-zinc-800/50 transition"
                    >
                      <div>
                        <p className="font-mono text-sm text-blue-400">{formatAddress(tx.hash)}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatTime(tx.timestamp)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{formatValue(tx.value)}</p>
                        <p
                          className={
                            "text-xs mt-1 " +
                            (tx.status === "ok" ? "text-green-400" : "text-yellow-400")
                          }
                        >
                          {tx.status === "ok" ? "Success" : tx.status}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 text-center backdrop-blur">
            <p className="text-gray-400">Please connect your wallet first</p>
          </div>
        )}
      </div>
    </div>
  );
}
