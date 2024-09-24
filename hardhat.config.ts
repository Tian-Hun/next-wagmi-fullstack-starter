import { vars, type HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "hardhat-chai-matchers-viem";

const INFURA_API_KEY = vars.get("INFURA_API_KEY");
const PRIVATE_KEY = vars.get("PRIVATE_KEY");
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");
const SEED_PHRASE = vars.get("SEED_PHRASE");

const config: HardhatUserConfig = {
    solidity: "0.8.27",
    paths: {
        root: "./contracts",
        sources: "sources",
    },
    networks: {
        sepolia: {
            url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
            chainId: 11155111,
            accounts: [PRIVATE_KEY],
        },
        hardhat: {
            accounts: {
                mnemonic: SEED_PHRASE,
            },
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
};

export default config;
