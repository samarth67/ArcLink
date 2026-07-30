"use client";

import { useState } from "react";
import { useAccount, useBalance, useChainId } from "wagmi";
import { formatEther } from "viem";

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const { data: balance } = useBalance({
    address: address,
  });

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [paymentLink, setPaymentLink] = useState("");

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3">Dashboard</h1>
          <p className="text-gray-400">
            Please connect your wallet first
          </p>
        </div>
      </div>
    );
  }

  const usdcBalance = balance
    ? Number(formatEther(balance.value)).toFixed(4)
    : "0.0000";

  const generateLink = () => {
    if (!address || !amount) {
      alert("Please enter an amount.");
      return;
    }

    const link =
      `${window.location.origin}/pay?` +
      `to=${address}` +
      `&amount=${encodeURIComponent(amount)}` +
      `&note=${encodeURIComponent(note)}`;

    setPaymentLink(link);
  };

  const copyLink = async () => {
    if (!paymentLink) return;

    await navigator.clipboard.writeText(paymentLink);
    alert("Payment link copied!");
  };

  return (
    <div className="min-h-screen text-white">

      {/* Header */}

      <div className="relative border-b border-zinc-800 px-8 py-10 overflow-hidden">

        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

        <h1 className="relative text-3xl font-bold bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
          Portfolio Dashboard
        </h1>

        <p className="relative text-gray-400 text-sm mt-1">
          Arc Testnet Overview
        </p>

      </div>

      <div className="p-8 max-w-6xl mx-auto">

        {/* Top Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/20 to-blue-900/10 p-6 backdrop-blur shadow-[0_0_25px_rgba(37,99,235,0.1)]">

            <p className="text-sm text-blue-300 mb-2">
              Total Balance
            </p>

            <h2 className="text-4xl font-bold">
              {usdcBalance} USDC
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              ≈ ${usdcBalance}
            </p>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur transition hover:border-zinc-700">

            <p className="text-sm text-gray-400 mb-2">
              Network
            </p>

            <h2 className="text-2xl font-bold text-green-400">
              {chainId === 5042002
                ? "Arc Testnet"
                : `Chain ${chainId}`}
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Connected
            </p>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur transition hover:border-zinc-700">

            <p className="text-sm text-gray-400 mb-2">
              Wallet
            </p>

            <h2 className="text-lg font-mono truncate">
              {address}
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Active
            </p>

          </div>

        </div>
                {/* Assets */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur">

          <h3 className="text-xl font-semibold mb-6">
            Assets
          </h3>

          <div className="flex items-center justify-between py-4 border-b border-zinc-800">

            <div className="flex items-center gap-4">

              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                $
              </div>

              <div>
                <p className="font-medium">USDC</p>
                <p className="text-sm text-gray-400">
                  USD Coin
                </p>
              </div>

            </div>

            <div className="text-right">
              <p className="font-medium">{usdcBalance}</p>
              <p className="text-sm text-gray-400">
                ${usdcBalance}
              </p>
            </div>

          </div>

        </div>

        {/* Create Payment Link */}

        <div className="mt-10 rounded-2xl border border-blue-500/20 bg-zinc-900/50 p-8 backdrop-blur shadow-[0_0_30px_rgba(37,99,235,0.08)]">

          <h2 className="text-2xl font-bold mb-2">
            🔗 Create Payment Link
          </h2>

          <p className="text-gray-400 mb-8">
            Generate a shareable USDC payment link.
          </p>

          <div className="space-y-6">

            <div>

              <label className="block text-sm text-gray-400 mb-2">
                Amount (USDC)
              </label>

              <input
                type="number"
                placeholder="10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-black/40 px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

            <div>

              <label className="block text-sm text-gray-400 mb-2">
                Payment Note
              </label>

              <input
                type="text"
                placeholder="Coffee Payment"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-black/40 px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

            <button
              onClick={generateLink}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 transition py-3 font-semibold"
            >
              Generate Payment Link
            </button>

          </div>

          {paymentLink && (

            <div className="mt-8 rounded-xl border border-zinc-800 bg-black/30 p-5">

              <p className="text-sm text-gray-400 mb-3">
                Your Payment Link
              </p>

              <div className="break-all rounded-lg bg-black/40 p-3 text-blue-400 text-sm font-mono">
                {paymentLink}
              </div>

              <button
                onClick={copyLink}
                className="mt-4 w-full rounded-xl border border-blue-500 py-3 hover:bg-blue-500/10 transition"
              >
                📋 Copy Link
              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}