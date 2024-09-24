'use client';

import React, { type ReactNode } from 'react';
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import { mainnet } from '@reown/appkit/networks';

import { wagmiAdapter, projectId, networks } from './config';

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
    throw new Error('Project ID is not defined');
}

// Set up metadata
const metadata = {
    name: "next-wagmi-fullstack-starter",
    description: "A Wagmi fullstack starter template for Next.js",
    url: "", // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/179229932"]
};

// Create the modal
const modal = createAppKit({
    themeMode: 'dark',
    adapters: [wagmiAdapter],
    projectId,
    networks,
    defaultNetwork: mainnet,
    metadata,
    features: {
        analytics: true, // Optional - defaults to your Cloud configuration
    }
});

export const ContextProvider = ({ children, cookies }: { children: ReactNode; cookies: string | null }) => {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies);

    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    );
};
