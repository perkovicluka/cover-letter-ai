// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for GitHub Pages
  },
  basePath: '/cover-letter-ai', // 👈 Replace <REPO_NAME> with your GitHub repo name
  trailingSlash: true, // Required for static hosting
}

module.exports = nextConfig;
