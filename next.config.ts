import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    async redirects() {
        return [
        {
            source: "/pages/terms-of-service",
            destination: "https://theywillkillyou.com/terms-of-service",
            permanent: false,
        },
        {
            source: "/collections/:path*",
            destination: "https://shop.theywillkillyou.com/collections/:path*",
            permanent: false,
        },
        ];
    },

    async rewrites() {
        const api = process.env.API_URL;
        if (!api) {
            console.warn("API_URL is not set; /api/* rewrites will be skipped.");
            return [];
        }
        return [
        {
            source: "/api/:path*",
            destination: `${api}/:path*`,
        },
        ];
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'twky.nyc3.cdn.digitaloceanspaces.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
