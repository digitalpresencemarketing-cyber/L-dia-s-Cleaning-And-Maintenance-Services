import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }, // permite qualquer domínio HTTPS
    ],
  },
};

export default nextConfig;
