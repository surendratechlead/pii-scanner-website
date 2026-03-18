import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  basePath: "/pii-scanner-website",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
