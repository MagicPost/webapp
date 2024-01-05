/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // esmExternals: 'loose',
    serverComponentsExternalPackages: ['mongoose', '@typegoose/typegoose'],
  },
};

module.exports = nextConfig;
