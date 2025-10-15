/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Disable ESLint during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Disable type-checking during build
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
