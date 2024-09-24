import { Address } from 'viem';
import { useChainId } from 'wagmi';

import { contractAddresses } from '@/constants/contractAddresses';

// get all possible chain IDs
type ChainId = keyof typeof contractAddresses;

// get all possible contract names
type ContractName = keyof typeof contractAddresses[ChainId];

interface UseContractAddressesResult {
    getAddress: (contractName: ContractName) => Address;
    isSupported: boolean;
    chainId: number;
    error: string | null;
}

export function useContractAddresses(): UseContractAddressesResult {
    const chainId = useChainId();

    const addresses = contractAddresses[chainId as ChainId];
    const isSupported = !!addresses && Object.keys(addresses).length > 0;

    if (!isSupported) {
        console.error(`No contracts found for chain ID ${chainId}`);
    }

    return {
        getAddress: (contractName: ContractName): Address =>
            (addresses && addresses[contractName as keyof typeof addresses]) || '0x0000000000000000000000000000000000000000' as Address,
        isSupported,
        chainId,
        error: !isSupported ? `No contracts found for chain ID ${chainId}` : null
    };
}
