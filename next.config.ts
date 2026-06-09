import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    trailingSlash: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.vaiacharms.gr",
            },
            {
                protocol: "https",
                hostname: "upload.wikimedia.org",
            }
        ],
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
