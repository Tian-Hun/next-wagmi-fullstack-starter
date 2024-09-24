// This file is auto-generated. Do not edit manually.

import { Address } from 'viem';

export type ContractName = 'lock' | 'Lock';

interface ContractAddresses {
    [chainId: number]: {
        [contractName: string]: Address;
    };
}

export const contractAddresses: ContractAddresses = {
    31337: {
        Lock: '0x2aD2204A7Cdc50E3b50830E620055E5F36D71066'
    }
} as const;
