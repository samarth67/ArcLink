export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-36 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Badge */}
      <div className="relative inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-sm text-gray-400 backdrop-blur mb-8">
        <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
        Live on Arc Testnet
      </div>

      <h1 className="relative text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
        The Social Layer of Arc
      </h1>

      <p className="relative mt-6 max-w-2xl text-lg md:text-xl text-gray-400">
        Connect, build, and grow on the Arc blockchain with a fast,
        beautiful and developer-friendly platform.
      </p>

      <div className="relative mt-10 flex flex-col sm:flex-row gap-4">
        <button className="rounded-xl bg-blue-600 px-8 py-3 font-medium text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-0.5">
          Launch App
        </button>

        <button className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-8 py-3 font-medium text-white backdrop-blur transition hover:bg-zinc-800 hover:-translate-y-0.5">
          Explore
        </button>
      </div>
    </section>
  );
}