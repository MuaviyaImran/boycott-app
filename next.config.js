/** @type {import('next').NextConfig} */
const dotenv = require("dotenv");

dotenv.config();
const nextConfig = {
  output: "export",
  distDir: "dist",
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["@acme/ui"],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
