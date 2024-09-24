import { defineConfig } from '@wagmi/cli';
import { react, hardhat } from '@wagmi/cli/plugins';

export default defineConfig({
    out: 'app/hooks/wagmiHooks.ts',
    plugins: [
        hardhat({
            project: 'contracts',
        }),
        react(),
    ],
});
