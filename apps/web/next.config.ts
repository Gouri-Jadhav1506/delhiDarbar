/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Note: For static export, Next.js image optimization is disabled.
  // Options for image optimization:
  // 1. Use next/image with 'unoptimized: true' and manually optimize images
  // 2. Use a third-party CDN like Cloudinary, Imgix, or Cloudflare Images
  // 3. Switch to server-side deployment (remove output: 'export') for automatic optimization
};

module.exports = nextConfig;