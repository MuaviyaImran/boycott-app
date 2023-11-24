/** @type {import('next').NextConfig} */
const dotenv = require("dotenv");
dotenv.config();
const nextConfig = {
  output: "export",
  distDir: "dist",
  reactStrictMode: true,
  env: {
    MONGO_URL: process.env.MONGO_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
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
