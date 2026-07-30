"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-zinc-800 bg-black px-8 py-5 text-white">
      <Link href="/" className="text-2xl font-bold">
        Arc<span className="text-blue-500">Link</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/faucet">Faucet</Link>
        <Link href="/explorer">Explorer</Link>
        <Link href="/profile">Profile</Link>

        <button className="rounded-xl bg-blue-600 px-5 py-2 hover:bg-blue-700 transition">
          Connect Wallet
        </button>
      </div>
    </nav>
  );
}