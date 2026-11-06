/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output is only for the Dockerfile build. On Vercel it breaks
  // Turbopack builds (the builder expects .next/next-server.js.nft.json,
  // which the standalone trace skips).
  output: process.env.NEXT_DOCKER_BUILD === '1' ? 'standalone' : undefined,
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
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        // Old query-string pagination; pages are now static paths.
        source: '/posts',
        has: [{ type: 'query', key: 'page', value: '(?<page>\\d+)' }],
        destination: '/posts/page/:page',
        permanent: true,
      },
    ];
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
