import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // <--- Agrega esto para que las rutas terminen en / y cPanel no se pierda
  images: {
    unoptimized: true,
  },
};

export default nextConfig;