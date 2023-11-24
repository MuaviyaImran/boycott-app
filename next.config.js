/** @type {import('next').NextConfig} */
const dotenv = require("dotenv");

dotenv.config();
const nextConfig = {

  output: 'export',
  reactStrictMode: true,
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
