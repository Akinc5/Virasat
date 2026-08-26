import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow external image domains for demo content
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    // Use unoptimized for local dev with /public images
  },

  // Required for Prisma in Next.js
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
