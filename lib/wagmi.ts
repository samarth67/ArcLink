import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

import { arcTestnet, networks } from "@/lib/arc";
import { PROJECT_ID } from "@/lib/config";

/**
 * Server-safe Wagmi adapter config.
 * Must live outside any "use client" file (Reown Next.js + Arc docs).
 */
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId: PROJECT_ID,
  ssr: true,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

export { arcTestnet, networks };
