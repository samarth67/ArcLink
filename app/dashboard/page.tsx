"use client";

import { useState } from "react";
import Link from "next/link";
import QRCode from "react-qr-code";

import { useAccount, useBalance, useChainId } from "wagmi";
import { formatEther } from "viem";

import { createPaymentLink } from "@/lib/payment";

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const { data: balance } = useBalance({
    address,
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

  const generateLink = async () => {
    if (!address) {
      alert("Connect your wallet first");
      return;
    }

    if (!amount) {
      alert("Enter an amount");
      return;
    }

    try {
      const id = await createPaymentLink({
        wallet: address,
        amount,
        note,
      });

      setPaymentLink(`${window.location.origin}/pay/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create payment link");
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(paymentLink);
    alert("Payment link copied!");
  };

  return (
    <div className="min-h-screen text-white">

      <div className="relative border-b border-zinc-800 px-8 py-10 overflow-hidden">

        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full" />

        <h1 className="relative text-3xl font-bold bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
          Portfolio Dashboard
        </h1>

        <p className="relative text-gray-400 mt-2">
          Arc Testnet Overview
        </p>

      </div>

      <div className="max-w-6xl mx-auto p-8">

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="rounded-2xl border border-blue-500/30 bg-blue-600/10 p-6">

            <p className="text-blue-300 text-sm">
              Total Balance
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {usdcBalance} USDC
            </h2>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

            <p className="text-gray-400 text-sm">
              Network
            </p>

            <h2 className="text-2xl font-bold mt-2 text-green-400">
              {chainId === 5042002
                ? "Arc Testnet"
                : `Chain ${chainId}`}
            </h2>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

            <p className="text-gray-400 text-sm">
              Wallet
            </p>

            <p className="font-mono mt-2 truncate">
              {address}
            </p>

          </div>

        </div>
                {/* Assets */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur mb-10">

          <h3 className="text-xl font-semibold mb-6">
            Assets
          </h3>

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                $
              </div>

              <div>

                <p className="font-semibold">
                  USDC
                </p>

                <p className="text-gray-400 text-sm">
                  USD Coin
                </p>

              </div>

            </div>

            <div className="text-right">

              <p className="font-semibold">
                {usdcBalance}
              </p>

              <p className="text-gray-400 text-sm">
                ${usdcBalance}
              </p>

            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-blue-500/20 bg-zinc-900/50 p-8">

          <h2 className="text-2xl font-bold mb-2">
            🔗 Create Payment Link
          </h2>

          <p className="text-gray-400 mb-8">
            Generate a premium ArcLink payment request.
          </p>

          <div className="space-y-5">

            <input
              type="number"
              placeholder="Amount (USDC)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-black/40 px-4 py-3"
            />

            <input
              type="text"
              placeholder="Payment Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-black/40 px-4 py-3"
            />

            <button
              onClick={generateLink}
              className="w-full rounded-xl bg-blue-600 py-3 hover:bg-blue-700"
            >
              Generate Payment Link
            </button>

          </div>

          {paymentLink && (

            <div className="mt-8 rounded-2xl border border-zinc-800 bg-black/40 p-6">

              <h3 className="font-semibold mb-4">
                Payment Link
              </h3>

              <div className="break-all text-blue-400 text-sm">
                {paymentLink}
              </div>

              <button
                onClick={copyLink}
                className="mt-4 w-full rounded-xl border border-blue-500 py-3"
              >
                📋 Copy Link
              </button>

              <div className="mt-8 flex justify-center">

                <div className="bg-white p-4 rounded-2xl">

                  <QRCode
                    value={paymentLink}
                    size={180}
                  />

                </div>

              </div>

        

            </div>

          )}

        </div>

      </div>

    </div>

  );

}