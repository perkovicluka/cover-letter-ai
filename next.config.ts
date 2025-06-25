/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: '/cover-letter-ai',
  assetPrefix: '/cover-letter-ai'
};

module.exports = nextConfig;
