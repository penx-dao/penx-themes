'use client'

import { createConfig } from '@privy-io/wagmi'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { AppKitNetwork, baseSepolia } from '@reown/appkit/networks'
import { cookieStorage, createStorage, http } from '@wagmi/core'
import { baseSepolia as viemBaseSepolia } from 'viem/chains'
import { PROJECT_ID } from '../constants'

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  {
    ...baseSepolia,
    rpcUrls: {
      default: {
        http: [
          'https://base-sepolia.g.alchemy.com/v2/3NOJzJclAc6EPYa2uW4rBchMV5o6eAI0',
        ],
      },
    },
  },
]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId: PROJECT_ID,
  networks,
})

export const privyWagmiConfig = createConfig({
  chains: [viemBaseSepolia], // Pass your required chains as an array
  transports: {
    [viemBaseSepolia.id]: http(),
  },
})

export const reownWagmiConfig = wagmiAdapter.wagmiConfig

export function getWagmiConfig(isPrivy: boolean) {
  return isPrivy ? privyWagmiConfig : reownWagmiConfig
}
