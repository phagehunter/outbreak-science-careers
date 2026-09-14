import type { NextConfig } from "next";

// Static export for GitHub Pages, served at https://curtishoffmann.com/outbreak-science-careers
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/outbreak-science-careers",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
