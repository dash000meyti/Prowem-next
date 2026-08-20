import type { NextConfig } from "next";
import path from "node:path";

const cpus = Number(process.env.NEXT_CPUS);

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  ...(Number.isFinite(cpus) && cpus > 0
    ? { experimental: { cpus } }
    : {}),
};

export default nextConfig;
