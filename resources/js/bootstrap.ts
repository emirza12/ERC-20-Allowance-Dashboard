import { createConfig } from 'wagmi'
import { http } from 'viem'
import { holesky } from 'viem/chains'
import { injected } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const transport = http()

export const queryClient = new QueryClient()

export const wagmiConfig = createConfig({
    chains: [holesky],
    connectors: [injected()],
    transports: {
        [holesky.id]: transport,
    },
})