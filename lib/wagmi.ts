import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { cookieStorage, createStorage } from "wagmi";

import { networks } from "@/lib/arc";
import { PROJECT_ID } from "@/lib/config";

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId: PROJECT_ID,
  networks: [...networks],
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;