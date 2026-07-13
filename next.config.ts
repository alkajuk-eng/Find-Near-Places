/* import type { NextConfig } from "next";

const nextConfig: NextConfig = { */
  /* config options here */
/* };

export default nextConfig; */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
      },
    ],
  },
};

module.exports = nextConfig;