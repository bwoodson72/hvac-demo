import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    deviceSizes: [360, 640, 750, 828, 1080, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 256, 384, 512, 640],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
