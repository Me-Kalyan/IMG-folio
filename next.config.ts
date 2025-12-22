import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    // Fallback: allow unoptimized images if remote pattern fails
    unoptimized: false,
  },
};

export default nextConfig;

