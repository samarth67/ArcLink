"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

type Payment = {
  id: string;
  wallet: string;
  amount: string;
  note: string;
  status: string;
  txHash?: string;
};

export default function HistoryPage() {
  const { address } = useAccount();
  console.log("Connected wallet:", address);

  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) {
      setPayments([]);
      setLoading(false);
      return;
    }

    async function loadPayments() {
      try {
        const q = query(
          collection(db, "paymentLinks"),
          where("wallet", "==", address),
          where("status", "==", "paid"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);
        
        console.log("Connected wallet:", address);
        console.log("Firestore query wallet:", address);
        console.log("Docs found:", snapshot.docs.length);
        console.log(snapshot.docs.map(doc => doc.data()));
        console.log("Docs found:", snapshot.docs.length);
        console.log(snapshot.docs);

        const list: Payment[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Payment, "id">),
        }));

        setPayments(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadPayments();
  }, [address]);

  return (
    <div className="min-h-screen text-white">
      <div className="relative border-b border-zinc-800 px-8 py-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[100px]" />

        <h1 className="relative bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-4xl font-bold text-transparent">
          📊 Payment Activity
        </h1>

        <p className="relative mt-2 text-gray-400">
          Track your payment links and completed transactions.
        </p>
      </div>

      <div className="mx-auto max-w-4xl p-8">
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : payments.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-10 text-center">
            <h2 className="text-2xl font-bold">No Payments Yet</h2>

            <p className="mt-2 text-gray-400">
              Create your first payment link.
            </p>

            <Link
              href="/dashboard"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 transition hover:bg-blue-700"
            >
              Back to Dashboard
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="group rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-black p-7 transition hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/20 text-2xl">
                      💸
                    </div>

                    <div>
                      <h2 className="text-3xl font-bold">
                        {payment.amount} USDC
                      </h2>

                      <p className="text-gray-400">
                        {payment.note || "Payment Request"}
                      </p>
                    </div>
                  </div>

                  {payment.status === "paid" ? (
                    <span className="rounded-full bg-green-500/20 px-4 py-2 text-green-400">
                      ✅ Paid
                    </span>
                  ) : (
                    <span className="rounded-full bg-yellow-500/20 px-4 py-2 text-yellow-400">
                      ⏳ Pending
                    </span>
                  )}
                </div>

                <div className="mt-6 border-t border-zinc-800 pt-5">
                  <p className="text-xs text-gray-500">Receiver Wallet</p>

                  <p className="mt-2 break-all font-mono text-sm">
                    {payment.wallet}
                  </p>
                </div>

                {payment.txHash && (
                  <div className="mt-5 flex items-center justify-between rounded-xl bg-green-500/10 p-4">
                    <p className="break-all font-mono text-xs">
                      {payment.txHash.slice(0, 20)}...
                    </p>

                    <a
                      href={`https://testnet.arcscan.app/tx/${payment.txHash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-green-600 px-4 py-2 text-sm"
                    >
                      Explorer ↗
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}