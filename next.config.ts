import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/my_portofolio",
  assetPrefix: "/my_portofolio/",
  images: {
    unoptimized: true, // Next.js image optimization API doesn't work in static export
  },
};

export default nextConfig;
