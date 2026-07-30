"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

import { parseUnits } from "viem";

import { db } from "@/lib/firebase";
import { USDC_ADDRESS, USDC_ABI } from "@/lib/usdc";

const router = useRouter();

const { address, isConnected } = useAccount();

const {
  data: hash,
  writeContract,
  isPending,
} = useWriteContract();

const {
  isSuccess: confirmed,
  isLoading: confirming,
} = useWaitForTransactionReceipt({
  hash,
});

type PaymentData = {
  wallet: string;
  amount: string;
  note: string;
  status: string;
};

export default function PayPage() {
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState<PaymentData | null>(null);

  useEffect(() => {
    async function loadPayment() {
      try {
        const ref = doc(db, "paymentLinks", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setPayment(snap.data() as PaymentData);
        }
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    if (id) {
      loadPayment();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Payment Link Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          💳 Pay with ArcLink
        </h1>

        <div className="space-y-5">

          <div>
            <p className="text-gray-400 text-sm">Amount</p>
            <p className="text-3xl font-bold text-blue-400">
              {payment.amount} USDC
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Note</p>
            <p className="text-lg">{payment.note || "-"}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Receiver</p>

            <p className="font-mono break-all text-sm">
              {payment.wallet}
            </p>
          </div>

          <button
            className="w-full rounded-xl bg-blue-600 py-4 font-semibold hover:bg-blue-700 transition"
          >
            Pay Now
          </button>

        </div>

      </div>
    </div>
  );
}