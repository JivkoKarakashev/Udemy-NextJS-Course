import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
      allowedOrigins: ['cdn-bucket.jivkokarakashev.work']
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-bucket.jivkokarakashev.work',
        pathname: '/**'
      },
    ],
    unoptimized: true
  }
};

export default nextConfig;
