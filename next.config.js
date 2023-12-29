/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'v1.tailwindcss.com',
      },
    ],
  },
};

module.exports = nextConfig;
