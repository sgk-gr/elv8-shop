import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    trailingSlash: true,
    images: {
        unoptimized: true,
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
    async rewrites() {
        return [
            {
                source: "/store-checkout/:path*",
                destination: "https://store.elv8now.com/checkout/:path*",
            },
            {
                source: "/store-api/:path*",
                destination: "https://store.elv8now.com/:path*",
            },
        ];
    },
    experimental: {
        scrollRestoration: false,
    },
};

export default nextConfig;
