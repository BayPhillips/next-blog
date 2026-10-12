// Lighthouse CI config. See docs/performance.md for how to run it.
//
// Environment variables:
//   LHCI_BASE_URL   Audit a deployed site (e.g. a Vercel preview). When unset,
//                   LHCI starts the local production server (`npm start`), so
//                   run `npm run build` first.
//   LHCI_PRESET     "mobile" (default, throttled like PageSpeed Insights) or "desktop".
//   LHCI_POST_SLUG  Post page to audit. Defaults to a long, image-heavy post.
//   LHCI_RUNS       Runs per URL; the median run is reported. Defaults to 3.
//   VERCEL_AUTOMATION_BYPASS_SECRET
//                   Sent as a header so protected preview deployments can be audited.

const baseUrl = (process.env.LHCI_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const preset = process.env.LHCI_PRESET === 'desktop' ? 'desktop' : 'mobile';
const postSlug = process.env.LHCI_POST_SLUG || 'finding-fulfillment-with-agentic-engineering';
const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

const paths = ['/', '/posts', `/posts/${postSlug}`, '/about', '/tags/ai'];

module.exports = {
  ci: {
    collect: {
      url: paths.map((path) => `${baseUrl}${path}`),
      numberOfRuns: Number(process.env.LHCI_RUNS || 3),
      ...(process.env.LHCI_BASE_URL
        ? {}
        : {
            startServerCommand: 'npm start',
            startServerReadyPattern: 'Ready in',
          }),
      settings: {
        ...(preset === 'desktop' ? { preset: 'desktop' } : {}),
        // Only score what we can act on; PWA is gone in Lighthouse 12 anyway.
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        ...(bypassSecret ? { extraHeaders: { 'x-vercel-protection-bypass': bypassSecret } } : {}),
      },
    },
    assert: {
      // Warnings, not errors, so a noisy run never blocks a PR. Tighten these
      // into errors once a few runs have shown where the site actually sits.
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9, aggregationMethod: 'median-run' }],
        'categories:accessibility': ['warn', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.95 }],
        'categories:seo': ['warn', { minScore: 0.95 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500, aggregationMethod: 'median-run' }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1, aggregationMethod: 'median-run' }],
        'total-blocking-time': ['warn', { maxNumericValue: 200, aggregationMethod: 'median-run' }],
        'total-byte-weight': ['warn', { maxNumericValue: 1_000_000 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: process.env.LHCI_OUTPUT_DIR || '.lighthouseci/reports',
    },
  },
};
