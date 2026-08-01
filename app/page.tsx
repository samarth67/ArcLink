import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";

export default function Home() {

  const features = [
  {
    title: "Payment Links",
    description: "Create and share secure payment links in seconds.",
    href: "/dashboard",
  },
  {
    title: "Wallet Identity",
    description: "Your verified on-chain identity powered by Arc.",
    href: "/profile",
  },
  {
    title: "Explorer",
    description: "Track every transaction directly on Arc Testnet.",
    href: "/explorer",
  },
  {
    title: "Faucet",
    description: "Claim free Arc testnet tokens instantly.",
    href: "/faucet",
  },
];

  return (
    <main className="min-h-screen bg-black text-white">

      <Hero />

      <section className="grid gap-6 px-8 pb-20 md:grid-cols-2 lg:grid-cols-4">
       {features.map((feature) => (
  <FeatureCard
    key={feature.title}
    title={feature.title}
    description={feature.description}
    href={feature.href}
  />
))}
      </section>

<section className="px-8 pb-20">
  <div className="mx-auto max-w-6xl rounded-3xl border border-zinc-800 bg-zinc-900/40 p-10">

    <h2 className="text-center text-4xl font-bold text-white">
      Why ArcLink?
    </h2>

    <p className="mt-3 text-center text-gray-400">
      Everything you need to create and manage payments on Arc Testnet.
    </p>

    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

      <div className="rounded-2xl border border-zinc-800 p-6">
        <h3 className="text-xl font-semibold">⚡ Fast Payments</h3>
        <p className="mt-3 text-gray-400">
          Create and share crypto payment links easily.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 p-6">
        <h3 className="text-xl font-semibold">🔒 Secure</h3>
        <p className="mt-3 text-gray-400">
          Wallet based payments powered by blockchain.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 p-6">
        <h3 className="text-xl font-semibold">🌐 Simple Sharing</h3>
        <p className="mt-3 text-gray-400">
          Share payment links anywhere.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 p-6">
        <h3 className="text-xl font-semibold">📊 Explorer</h3>
        <p className="mt-3 text-gray-400">
          View blockchain transactions.
        </p>
      </div>

    </div>

  </div>
</section>

<section className="px-8 pb-20">
  <div className="mx-auto max-w-6xl">

    <h2 className="text-center text-4xl font-bold text-white">
      How ArcLink Works
    </h2>

    <p className="mt-3 text-center text-gray-400">
      Create, share and receive payments in simple steps.
    </p>

    <div className="mt-10 grid gap-6 md:grid-cols-4">

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
        <div className="text-4xl">👛</div>
        <h3 className="mt-4 font-semibold">Connect Wallet</h3>
        <p className="mt-2 text-sm text-gray-400">
          Connect your Arc wallet.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
        <div className="text-4xl">🔗</div>
        <h3 className="mt-4 font-semibold">Create Link</h3>
        <p className="mt-2 text-sm text-gray-400">
          Generate a payment link.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
        <div className="text-4xl">📤</div>
        <h3 className="mt-4 font-semibold">Share</h3>
        <p className="mt-2 text-sm text-gray-400">
          Share it with anyone.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
        <div className="text-4xl">💸</div>
        <h3 className="mt-4 font-semibold">Receive</h3>
        <p className="mt-2 text-sm text-gray-400">
          Receive payment in wallet.
        </p>
      </div>

    </div>

  </div>
</section>

      <Footer />

    </main>
  );
}