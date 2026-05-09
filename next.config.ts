import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    turbopack: {
        root: process.cwd(),
    },
    experimental: {
        scrollRestoration: false,
    },
};

export default nextConfig;
