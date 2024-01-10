/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
        config.cache = false;
        return config;
    }
}

module.exports = nextConfig
