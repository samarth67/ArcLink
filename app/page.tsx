import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";

export default function Home() {
  const features = [
    {
      title: "Social Feed",
      description: "Discover builders and projects on Arc.",
    },
    {
      title: "Wallet Identity",
      description: "Show your on-chain profile.",
    },
    {
      title: "Faucet Hub",
      description: "Claim Arc testnet tokens easily.",
    },
    {
      title: "Transaction Viewer",
      description: "Track your latest blockchain activity.",
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
          />
        ))}
      </section>

      <Footer />
    </main>
  );
}