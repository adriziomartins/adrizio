import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    qualities: [60, 75],
  },

  allowedDevOrigins: ['192.168.1.4'],
}

export default nextConfig
