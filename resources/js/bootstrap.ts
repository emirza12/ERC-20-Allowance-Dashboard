import { createConfig } from 'wagmi'
import { http, fallback } from 'viem'
import { holesky } from 'viem/chains'
import { injected } from 'wagmi/connectors'
import { QueryClient } from '@tanstack/react-query'

// Use multiple RPC providers with fallback
const transport = fallback([
  http('https://ethereum-holesky.blockpi.network/v1/rpc/public'),
  http('https://rpc.ankr.com/eth_holesky'),
  http('https://holesky.rpc.thirdweb.com'),
  http('https://holesky.base.org')
])

export const queryClient = new QueryClient()

export const wagmiConfig = createConfig({
    chains: [holesky],
    connectors: [injected()],
    transports: {
        [holesky.id]: transport,
    },
})