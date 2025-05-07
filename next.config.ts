import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vp7bwbf9cme8x1zb.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
