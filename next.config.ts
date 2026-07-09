import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i1.sndcdn.com",
        port: "",
        pathname: "/artworks-**",
      },
    ],
  }
};

export default nextConfig;
