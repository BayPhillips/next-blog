/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  logging: {
    fetches: { fullUrl: false },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
