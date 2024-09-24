import { cookieStorage, createStorage } from '@wagmi/core';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, sepolia } from '@reown/appkit/networks';
import { hardhat } from 'viem/chains';
import { CaipNetwork } from '@reown/appkit';

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;

if (!projectId) {
    throw new Error('Project ID is not defined');
}

const hardhatNetwork: CaipNetwork = {
    id: `eip155:${hardhat.id}`,
    chainId: hardhat.id,
    chainNamespace: 'eip155',
    name: hardhat.name,
    currency: hardhat.nativeCurrency.symbol,
    explorerUrl: '',
    rpcUrl: hardhat.rpcUrls.default.http[0],
};

export const networks = [mainnet, sepolia, hardhatNetwork];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage
    }),
    ssr: true,
    projectId,
    networks
});

export const config = wagmiAdapter.wagmiConfig;
