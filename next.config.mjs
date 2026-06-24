/** @type {import('next').NextConfig} */
const nextConfig = {
  // Plain <img> from /public is used throughout, so next/image config isn't needed.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
