import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/devasurya-portfolio",
  assetPrefix: "/devasurya-portfolio/",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
