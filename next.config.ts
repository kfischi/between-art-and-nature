import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // השתמשנו ב-remotePatterns כי domains נחשב למיושן בגרסאות החדשות
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
