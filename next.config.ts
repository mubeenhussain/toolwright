import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/tools/:slug",
        destination: "/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
