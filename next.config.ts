import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Turbopack automatically reads path aliases from tsconfig.json/jsconfig.json
  turbopack: {},
};

export default nextConfig;
