import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
          search: '',
          pathname: '/**',
        },
        {
          protocol:'https',
          hostname:"avatars.githubusercontent.com",
        }
      ],
    },
};

export default nextConfig;
