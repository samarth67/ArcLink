export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-32 px-6">
      <h1 className="text-6xl font-bold text-white">
        The Social Layer of Arc
      </h1>

      <p className="mt-6 max-w-2xl text-xl text-gray-400">
        Connect, build, and grow on the Arc blockchain with a fast,
        beautiful and developer-friendly platform.
      </p>

      <div className="mt-10 flex gap-4">
        <button className="rounded-xl bg-blue-600 px-8 py-3 font-medium hover:bg-blue-700">
          Launch App
        </button>

        <button className="rounded-xl border border-zinc-700 px-8 py-3 hover:bg-zinc-900">
          Explore
        </button>
      </div>
    </section>
  );
}