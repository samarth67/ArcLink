import { defineChain } from "viem";

export const arcTestnet = defineChain({
  id: 11155111, // Temporary placeholder - we'll replace with Arc's official chain ID
  name: "Arc Testnet",
  nativeCurrency: {
    name: "ARC",
    symbol: "ARC",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia.org"],
    },
  },
});