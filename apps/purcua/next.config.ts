import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpila el codigo fuente de los paquetes compartidos del monorepo
  transpilePackages: ["@repo/ui"],
};

export default nextConfig;
