import WalletButton from "@/components/WalletButton";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6 border-b border-zinc-800">
      <h1 className="text-3xl font-bold text-white">
        Arc<span className="text-blue-500">Link</span>
      </h1>

      <WalletButton />
    </nav>
  );
}