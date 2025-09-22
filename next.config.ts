import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        ignoreBuildErrors: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ecommerce.routemisr.com",
                port: "",
                pathname: "/Route-Academy-categories/**",
                search: "",
            },
            {
                protocol: "https",
                hostname: "ecommerce.routemisr.com",
                port: "",
                pathname: "/Route-Academy-products/**",
                search: "",
            },
            {
                protocol: "https",
                hostname: "ecommerce.routemisr.com",
                port: "",
                pathname: "/Route-Academy-brands/**",
                search: "",
            },
        ],
    },
};

export default nextConfig;
