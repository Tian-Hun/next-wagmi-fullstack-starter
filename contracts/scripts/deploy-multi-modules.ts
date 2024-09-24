import path from "path";
import * as fs from 'fs';
import hre from "hardhat";
import { Address } from "viem";

import LockModule from "../ignition/modules/Lock";

export interface DeployedContracts {
    [contractName: string]: Address;
}

async function deployModule(): Promise<DeployedContracts> {
    const ignitionModules = [
        LockModule,
    ];

    const deployedContracts: DeployedContracts = {};

    for (const ignitionModule of ignitionModules) {
        console.log(`Deploying module: ${ignitionModule.id}`);
        const result = await hre.ignition.deploy(ignitionModule);
        for (const [key, contract] of Object.entries(result)) {
            const contractName = (ignitionModule.results as Record<string, any>)[key].contractName;
            console.log(`Deployed ${contractName}`);
            deployedContracts[contractName] = contract.address;
        }
    }

    return deployedContracts;
}

function dedent(str: string): string {
    const lines = str.split('\n');
    const minIndent = lines.filter(line => line.trim()).reduce((min, line) => {
        const indent = line.match(/^\s*/)?.[0].length;
        return Math.min(min, indent || Infinity);
    }, Infinity);
    return lines.map(line => line.slice(minIndent)).join('\n').trim();
}

async function generateContractAddressesFile(deployedContracts: DeployedContracts) {
    const { chainId } = hre.network.config;

    if (chainId === undefined) {
        throw new Error('Chain ID is undefined');
    }

    const outputPath = path.resolve(__dirname, '../../app/constants/contractAddresses.ts');

    let existingAddresses: Record<number, Record<string, string>> = {};

    // Read the existing contract addresses file
    try {
        if (!fs.existsSync(outputPath)) {
            fs.writeFileSync(outputPath, '');
        }

        const existingContent = fs.readFileSync(outputPath, 'utf8');
        const match = existingContent.match(/export const contractAddresses: ContractAddresses = ({[\s\S]*?}) as const;/);
        if (match) {
            existingAddresses = JSON.parse(match[1].replace(/(\w+):/g, '"$1":').replace(/'/g, '"'));
        }
    } catch (error) {
        console.log('Failed to read existing contract addresses file:', error);
    }

    // Update the existing addresses with the newly deployed contracts
    existingAddresses[chainId] = {
        ...existingAddresses[chainId],
        ...deployedContracts
    };

    const contractEntries = Object.entries(existingAddresses)
        .map(([chainId, contracts]) => {
            const contractLines = Object.entries(contracts)
                .map(([contractName, address]) => `        ${contractName}: '${address}'`)
                .join(',\n');
            return `    ${chainId}: {\n${contractLines}\n    }`;
        })
        .join(',\n');

    // Generate ContractName type
    const contractNames = new Set<string>();
    Object.values(existingAddresses).forEach(contracts => {
        Object.keys(contracts).forEach(name => contractNames.add(name));
    });
    const contractNameType = `export type ContractName = ${Array.from(contractNames).map(name => `'${name}'`).join(' | ')};`;

    const fileContent = dedent(`
        // This file is auto-generated. Do not edit manually.

        import { Address } from 'viem';

        ${contractNameType}

        interface ContractAddresses {
            [chainId: number]: {
                [contractName: string]: Address;
            };
        }

        export const contractAddresses: ContractAddresses = {
    `) + `\n${contractEntries}\n` + dedent(`
        } as const;
    `);

    fs.writeFileSync(outputPath, fileContent);
    console.log('\n🚀 contractAddresses.ts file updated with new contract addresses and ContractName type');

    // Print out the deployed contracts
    for (const [contractName, address] of Object.entries(deployedContracts)) {
        console.log(`${contractName} deployed at ${address} on chain ${chainId}`);
    }
}

async function main() {
    const deployedContracts = await deployModule();
    await generateContractAddressesFile(deployedContracts);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
