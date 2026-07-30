import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex items-center justify-center pt-40">
        <h1 className="text-5xl font-bold">
          Dashboard (Coming Soon)
        </h1>
      </div>
    </main>
  );
}