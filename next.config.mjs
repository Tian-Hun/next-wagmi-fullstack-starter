/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    webpack: (config) => {
        config.cache = false;

        config.externals.push('pino-pretty', 'lokijs', 'encoding');

        return config;
    },
};

export default nextConfig;
