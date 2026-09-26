/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Type-checking is skipped only for production Docker image builds
  // (the Dockerfile sets NEXT_SKIP_TYPECHECK=1). Local builds and CI
  // checks still run `tsc` via `next build` / `npx tsc --noEmit`.
  typescript: {
    ignoreBuildErrors: process.env.NEXT_SKIP_TYPECHECK === '1',
  },
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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
