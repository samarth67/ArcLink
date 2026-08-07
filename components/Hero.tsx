import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#1d4ed8_0%,transparent_60%)] opacity-20" />

      <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm text-gray-400 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
        Live on Arc Testnet
      </div>

      <h1 className="mt-8 text-5xl font-bold text-white md:text-7xl">
        Create & Share Crypto Payment Links
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-gray-400">
        Generate secure payment links, receive crypto instantly,
        track every transaction and manage everything on Arc Testnet.
      </p>

      <div className="mt-10 flex gap-4">
        <Link
          href="/dashboard"
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Create Payment Link
        </Link>

        <Link
          href="/explorer"
          className="rounded-xl border border-zinc-700 px-6 py-3 text-white hover:bg-zinc-900"
        >
          View Explorer
        </Link>
      </div>
    </section>
  );
}