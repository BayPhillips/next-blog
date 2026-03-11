# Cloudflare Workers + VPC Deployment Plan

Migration plan for moving the Next.js 15 blog (bayphillips.com) and its embedded Sanity Studio from Vercel to Cloudflare Workers, with Workers VPC for private networking.

---

## Table of Contents

1. [Current Architecture](#1-current-architecture)
2. [Target Architecture](#2-target-architecture)
3. [Migration Steps](#3-migration-steps)
4. [Image Optimization Strategy](#4-image-optimization-strategy)
5. [Sanity Studio Considerations](#5-sanity-studio-considerations)
6. [Workers VPC Setup](#6-workers-vpc-setup)
7. [Environment Variables & Secrets](#7-environment-variables--secrets)
8. [Vercel-Specific Code Removal](#8-vercel-specific-code-removal)
9. [Bundle Size Management](#9-bundle-size-management)
10. [DNS & Domain Cutover](#10-dns--domain-cutover)
11. [CI/CD Pipeline](#11-cicd-pipeline)
12. [Rollback Plan](#12-rollback-plan)
13. [Known Risks & Mitigations](#13-known-risks--mitigations)

---

## 1. Current Architecture

| Component           | Current Host  | Notes                                     |
|---------------------|---------------|-------------------------------------------|
| Next.js blog        | Vercel        | App Router, SSG + ISR, standalone output   |
| Sanity Studio       | Vercel        | Embedded at `/studio` (force-static)       |
| Sanity Content Lake | Sanity Cloud  | Hosted CMS backend (unchanged)             |
| Images              | Sanity CDN    | `cdn.sanity.io`, optimized via `next/image` |
| Analytics           | Vercel        | `@vercel/analytics` + `@vercel/speed-insights` |
| DNS                 | (varies)      | Points to Vercel                           |

**Key dependencies that affect migration:**
- `next` ^16.1.1 (supported by @opennextjs/cloudflare)
- `sanity` ^5.1.0 (heavy dependency, ~large bundle)
- `styled-components` ^6.1.15 (required by Sanity Studio)
- `@vercel/analytics` ^1.6.1 (Vercel-only, must replace)
- `@vercel/speed-insights` ^1.3.1 (Vercel-only, must replace)
- `next/image` with `cdn.sanity.io` remote pattern

---

## 2. Target Architecture

```
                    ┌──────────────────────────────────────┐
                    │         Cloudflare Global Network      │
                    │                                        │
  User ──────────► │  ┌──────────────────────────────────┐  │
                    │  │   Cloudflare Worker (OpenNext)    │  │
                    │  │                                    │  │
                    │  │  ┌────────────┐ ┌──────────────┐  │  │
                    │  │  │ Blog App   │ │ /studio      │  │  │
                    │  │  │ (SSR/SSG)  │ │ (Static SPA) │  │  │
                    │  │  └─────┬──────┘ └──────────────┘  │  │
                    │  └────────┼───────────────────────────┘  │
                    │           │                               │
                    │  ┌────────▼──────────┐                   │
                    │  │  R2 Bucket        │                   │
                    │  │  (ISR Cache)      │                   │
                    │  └──────────────────-┘                   │
                    │                                          │
                    │  ┌──────────────────────┐                │
                    │  │ Cloudflare Images     │               │
                    │  │ (Image Optimization)  │               │
                    │  └──────────────────────-┘               │
                    │                                          │
                    │  ┌──────────────────────┐                │
                    │  │ Workers VPC           │               │
                    │  │ (Private networking   │               │
                    │  │  via CF Tunnel)       │               │
                    │  └──────────────────────-┘               │
                    └──────────────────────────────────────────┘
                                    │
                                    ▼
                          ┌──────────────────┐
                          │  Sanity Cloud     │
                          │  (Content Lake)   │
                          └──────────────────┘
```

| Component           | Target Host            | Notes                                    |
|---------------------|------------------------|------------------------------------------|
| Next.js blog        | Cloudflare Workers     | Via @opennextjs/cloudflare adapter        |
| Sanity Studio       | Cloudflare Workers     | Served as static assets within same Worker|
| ISR/Incremental Cache| Cloudflare R2         | R2 bucket for incremental cache           |
| Images              | Cloudflare Images      | Or custom loader pointing to Sanity CDN   |
| Analytics           | Cloudflare Web Analytics| Free, privacy-first alternative          |
| Private networking  | Workers VPC + Tunnel   | For any private API/database access       |
| DNS                 | Cloudflare DNS         | Required for Workers custom domains       |

---

## 3. Migration Steps

### Phase 1: Install & Configure OpenNext Adapter

**Step 1.1: Install dependencies**

```bash
npm install @opennextjs/cloudflare@latest
npm install --save-dev wrangler@latest
```

**Step 1.2: Create `wrangler.jsonc`** (project root)

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "main": ".open-next/worker.js",
  "name": "bayphillips-blog",
  "compatibility_date": "2025-05-05",
  "compatibility_flags": [
    "nodejs_compat",
    "global_fetch_strictly_public"
  ],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  // Image optimization via Cloudflare Images
  "images": {
    "binding": "IMAGES"
  },
  // R2 bucket for ISR incremental cache
  "r2_buckets": [
    {
      "binding": "INCREMENTAL_CACHE",
      "bucket_name": "bayphillips-cache"
    }
  ]
}
```

**Why `compatibility_date: "2025-05-05"`:** This date ensures `process.env` population works by default (requires >= 2025-04-01) and fixes the `FinalizationRegistry` error (requires >= 2025-05-05).

**Step 1.3: Create `open-next.config.ts`** (project root)

```ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
```

**Step 1.4: Update `next.config.js`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'standalone' — OpenNext handles output bundling
  // output: 'standalone',  <-- REMOVE THIS
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
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
```

The key change: **remove `output: 'standalone'`**. The OpenNext adapter handles bundling for Workers; the standalone output mode is for Docker/Node.js self-hosting and conflicts with the adapter.

**Step 1.5: Update `package.json` scripts**

```json
{
  "scripts": {
    "predev": "npm run typegen",
    "dev": "next dev --turbopack",
    "prebuild": "npm run typegen",
    "build": "next build --webpack",
    "start": "next start",
    "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
    "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
    "upload": "opennextjs-cloudflare build && opennextjs-cloudflare upload",
    "cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts",
    "lint": "next lint",
    "typegen": "sanity schema extract && sanity typegen generate",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test"
  }
}
```

**Step 1.6: Update `.gitignore`**

Add `.open-next` to `.gitignore` to exclude the build output.

---

### Phase 2: Handle Image Optimization

Two options are available. Choose based on your Cloudflare plan:

#### Option A: Cloudflare Images Binding (Recommended)

The `wrangler.jsonc` above already includes the `images` binding. This uses Cloudflare's image transformation service, which is the most seamless replacement for Vercel's `next/image` optimization. No code changes are needed — `next/image` will work transparently.

**Requirements:**
- Cloudflare Images subscription (included in some plans, or pay-per-use)
- The `IMAGES` binding in `wrangler.jsonc` (already configured above)

#### Option B: Custom Loader (Sanity CDN Direct)

If you want to skip Cloudflare Images and use Sanity's built-in image CDN transformations directly:

Create `image-loader.ts` in the project root:

```ts
export default function sanityImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // If the image is already from Sanity CDN, use their transformation params
  if (src.includes('cdn.sanity.io')) {
    const url = new URL(src);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', (quality || 75).toString());
    url.searchParams.set('auto', 'format');
    return url.toString();
  }

  // Fallback: use Cloudflare image resizing
  const params = [`width=${width}`, `quality=${quality || 75}`, 'format=auto'];
  return `/cdn-cgi/image/${params.join(',')}/${src}`;
}
```

Then update `next.config.js`:

```js
images: {
  loader: 'custom',
  loaderFile: './image-loader.ts',
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.sanity.io',
      port: '',
      pathname: '/images/**',
    },
  ],
},
```

**Recommendation:** Start with Option A (Cloudflare Images binding) for the simplest migration. Fall back to Option B if cost is a concern.

---

### Phase 3: Replace Vercel-Specific Dependencies

#### 3.1: Remove Vercel packages

```bash
npm uninstall @vercel/analytics @vercel/speed-insights vercel
```

#### 3.2: Replace analytics

**Option A: Cloudflare Web Analytics (Recommended)**

Cloudflare Web Analytics is free, privacy-first, and doesn't require JavaScript. Enable it in the Cloudflare dashboard under your domain's Analytics settings. It uses a lightweight JS beacon.

Add the Cloudflare beacon to the root layout:

```tsx
// In app/(blog)/layout.tsx — replace:
//   import { Analytics } from "@vercel/analytics/react"
//   import { SpeedInsights } from "@vercel/speed-insights/next"
// With:
import Script from "next/script";

// In the JSX, replace <Analytics /> and <SpeedInsights /> with:
<Script
  src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon='{"token": "YOUR_CF_WEB_ANALYTICS_TOKEN"}'
  strategy="afterInteractive"
/>
```

**Option B: Keep third-party analytics**

If you prefer more detailed analytics, integrate a third-party solution like Plausible, Fathom, or Umami instead.

#### 3.3: Update layout imports

In `app/(blog)/layout.tsx`, remove:
```tsx
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
```

And remove `<Analytics />` and `<SpeedInsights />` from the JSX tree.

---

### Phase 4: Create Cloudflare R2 Bucket

The R2 bucket is used for ISR incremental caching (replacing Vercel's built-in cache).

```bash
# Create the R2 bucket via Wrangler CLI
wrangler r2 bucket create bayphillips-cache
```

This bucket is already referenced in the `wrangler.jsonc` configuration above.

---

### Phase 5: Test Locally

```bash
# Build and preview in the Workers runtime (workerd)
npm run preview
```

This runs your app locally in the `workerd` runtime, which is much closer to production than `next dev`. Verify:

- [ ] Homepage renders with correct content from Sanity
- [ ] Blog post pages render (both statically generated and on-demand)
- [ ] `/studio` loads and Sanity Studio is functional
- [ ] Images load and are optimized
- [ ] Draft mode works (`/api/draft` route)
- [ ] Dark mode toggle works
- [ ] Contact form validation works
- [ ] Navigation between pages works
- [ ] Sitemap generates correctly at `/sitemap.xml`
- [ ] Tag pages render
- [ ] About and Contact pages render

---

### Phase 6: Deploy to Cloudflare Workers

```bash
# Deploy to Cloudflare Workers
npm run deploy
```

This will deploy to a `*.workers.dev` subdomain initially.

---

## 4. Image Optimization Strategy

The blog heavily uses `next/image` (64+ instances) with images from Sanity CDN (`cdn.sanity.io`). The recommended approach:

1. **Use the Cloudflare Images binding** in `wrangler.jsonc` — this makes `next/image` work transparently without code changes.
2. Sanity's own image CDN handles responsive sizing via URL parameters (`?w=`, `?h=`, `?fit=`, `?auto=format`), so images are already well-optimized at the source.
3. If Cloudflare Images costs are a concern, the custom loader (Option B above) delegates resizing to Sanity CDN, which is free with your Sanity plan.

**No changes needed** to existing `<Image>` component usage or the `lib/sanity/utils.ts` image utilities.

---

## 5. Sanity Studio Considerations

### Current Setup
- Sanity Studio is embedded at `/studio` as a Next.js route
- Uses `dynamic = "force-static"` — built as a static SPA at build time
- Depends on `sanity` ^5.1.0, `styled-components` ^6.1.15, and React 19

### Cloudflare Compatibility

The `/studio` route is `force-static`, meaning it will be pre-rendered at build time and served as static assets through the Worker's `ASSETS` binding. This is the ideal case — the heavy Sanity packages won't be in the server Worker bundle at all for this route.

**Potential issues:**
1. **Bundle size**: The `sanity` package is large. Since Studio is static, it should be served from the assets directory, not bundled into the Worker. Verify this after building by checking `.open-next/worker.js` size.
2. **Sanity manifest extraction**: The current `postbuild` script (`npx sanity manifest extract --path public/studio/static`) may need path adjustment for the OpenNext build output.

### If Studio causes Worker size issues

If the `sanity` package ends up in the server bundle despite `force-static`, consider deploying Studio separately:

1. **Separate Sanity Studio deployment**: Deploy Studio as its own Cloudflare Pages project or use `sanity deploy` to host it on Sanity's own infrastructure (`*.sanity.studio`).
2. This eliminates the heaviest dependency from the blog Worker entirely.
3. Update CORS settings in Sanity to allow the new Studio origin.

**Recommendation**: Try the embedded approach first. Only separate Studio if bundle size exceeds limits.

---

## 6. Workers VPC Setup

Workers VPC enables your Cloudflare Worker to access private resources (databases, internal APIs) via Cloudflare Tunnels. This is relevant if you need to:

- Connect to a private database (e.g., for contact form submissions)
- Access internal APIs not exposed to the public internet
- Connect to services in AWS VPC, Azure VNet, GCP VPC, or on-premise networks

### When You Need Workers VPC

For this blog, the primary data source is Sanity's public API (`api.sanity.io` / `cdn.sanity.io`), which doesn't require VPC. Workers VPC becomes relevant if you:

1. Add a private database for contact form submissions
2. Need to call internal microservices
3. Want to access private infrastructure for content enrichment

### Setup Steps (when needed)

**Step 6.1: Install and configure `cloudflared`**

```bash
# Install cloudflared on your private infrastructure
# (the machine/network hosting the private service)
brew install cloudflare/cloudflare/cloudflared  # macOS
# or download from https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/
```

**Step 6.2: Create a Cloudflare Tunnel** (via dashboard or CLI)

```bash
cloudflared tunnel login
cloudflared tunnel create bayphillips-private
```

**Step 6.3: Configure the tunnel**

Create `~/.cloudflared/config.yml` on the machine running the tunnel:

```yaml
tunnel: <TUNNEL_ID>
credentials-file: /root/.cloudflared/<TUNNEL_ID>.json

ingress:
  - hostname: internal-api.bayphillips.com
    service: http://localhost:8080
  - service: http_status:404
```

**Step 6.4: Run the tunnel**

```bash
cloudflared tunnel run bayphillips-private
```

**Step 6.5: Add VPC Service binding to `wrangler.jsonc`**

```jsonc
{
  // ... existing config ...
  "services": [
    {
      "binding": "PRIVATE_API",
      "service": "bayphillips-private-vpc",
      "entrypoint": "default"
    }
  ]
}
```

**Step 6.6: Use in your Worker code**

```ts
// In an API route or server component
const response = await env.PRIVATE_API.fetch("https://internal-api.bayphillips.com/data");
const data = await response.json();
```

### Requirements

- `cloudflared` version 2025.7.0 or later
- QUIC protocol: outbound UDP port 7844 must be open on the tunnel host
- Cloudflare Tunnel uses the `auto` or `quic` transport protocol

### Costs

Workers VPC is currently in open beta and free for all Workers plans, as are Cloudflare Tunnels.

---

## 7. Environment Variables & Secrets

### Current Environment Variables

| Variable                            | Type   | Cloudflare Equivalent        |
|-------------------------------------|--------|------------------------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID`     | Public | `wrangler.jsonc` vars        |
| `NEXT_PUBLIC_SANITY_DATASET`        | Public | `wrangler.jsonc` vars        |
| `NEXT_PUBLIC_SANITY_PERSPECTIVE`    | Public | `wrangler.jsonc` vars        |
| `SANITY_API_READ_TOKEN`            | Secret | `wrangler secret put`        |
| `NEXT_PUBLIC_SITE_URL`             | Public | `wrangler.jsonc` vars        |

### Configuration

Add public variables to `wrangler.jsonc`:

```jsonc
{
  // ... existing config ...
  "vars": {
    "NEXT_PUBLIC_SANITY_PROJECT_ID": "your-project-id",
    "NEXT_PUBLIC_SANITY_DATASET": "production",
    "NEXT_PUBLIC_SANITY_PERSPECTIVE": "previewDrafts",
    "NEXT_PUBLIC_SITE_URL": "https://bayphillips.com"
  }
}
```

Set secrets via Wrangler CLI:

```bash
wrangler secret put SANITY_API_READ_TOKEN
# Prompted to enter the token value securely
```

**Important**: With `compatibility_date >= 2025-04-01`, `process.env` is automatically populated from Worker bindings. No code changes needed for `process.env.NEXT_PUBLIC_*` or `process.env.SANITY_API_READ_TOKEN` access patterns.

---

## 8. Vercel-Specific Code Removal

### Files to modify

| File                              | Change                                              |
|-----------------------------------|-----------------------------------------------------|
| `app/(blog)/layout.tsx`           | Remove `@vercel/analytics` and `@vercel/speed-insights` imports and components |
| `package.json`                    | Remove `@vercel/analytics`, `@vercel/speed-insights`, `vercel` deps |
| `vercel.json`                     | Delete file (no longer needed)                      |
| `Dockerfile`                      | Keep for local dev, but not used for CF deployment   |

### Draft mode

The `/api/draft` route handler uses standard Next.js `draftMode()` API, which is supported by OpenNext. No changes needed.

### Server actions

The `disableDraftMode()` server action in `app/(blog)/actions.ts` uses standard Next.js APIs. No changes needed.

---

## 9. Bundle Size Management

This is the highest-risk area of the migration. Cloudflare Workers have strict size limits:

| Plan          | Compressed Limit |
|---------------|-----------------|
| Workers Free  | 3 MiB          |
| Workers Paid  | 10 MiB         |

### Size Risk Assessment

**High-risk dependencies** (may end up in server Worker bundle):
- `sanity` — Very large package (~multiple MBs)
- `styled-components` — Required by Sanity Studio
- `react-syntax-highlighter` / `prismjs` — Code highlighting libraries

**Mitigations:**

1. **Verify static routes stay static**: The `/studio` route is `force-static`, so Sanity packages should only appear in static assets, not the Worker. Verify after build:
   ```bash
   npx @opennextjs/cloudflare build
   ls -lh .open-next/worker.js
   # Check compressed size — must be under 10 MiB (paid) or 3 MiB (free)
   ```

2. **Analyze the bundle**:
   ```bash
   # After building, analyze what's in the Worker
   # Use the .open-next/server-functions/default/handler.mjs.meta.json
   # with esbuild Bundle Size Analyzer
   ```

3. **Use the multi-worker setup** if needed:
   OpenNext supports splitting your app into multiple Workers. This is useful if a single Worker exceeds size limits. See [Multi Worker docs](https://opennext.js.org/cloudflare/howtos/multi-worker).

4. **Consider dynamic imports**: For heavy client-side libraries like `react-syntax-highlighter`, ensure they're only imported in client components and not pulled into server bundles.

5. **Separate Sanity Studio** as a last resort (see Section 5).

### Workers Paid Plan

A Workers Paid plan ($5/month) is strongly recommended for this project to get the 10 MiB limit. The free 3 MiB limit is very tight for a Next.js app with Sanity integration.

---

## 10. DNS & Domain Cutover

### Prerequisites
- Domain DNS must be managed by Cloudflare (or use a CNAME setup)
- Cloudflare account with the domain added

### Steps

**Step 10.1: Add custom domain to the Worker**

```bash
# Via Wrangler CLI
wrangler deploy  # First deploy to *.workers.dev

# Then add custom domain via dashboard or wrangler.jsonc:
```

Add to `wrangler.jsonc`:

```jsonc
{
  // ... existing config ...
  "routes": [
    {
      "pattern": "bayphillips.com/*",
      "zone_name": "bayphillips.com"
    },
    {
      "pattern": "www.bayphillips.com/*",
      "zone_name": "bayphillips.com"
    }
  ]
}
```

**Step 10.2: Verify on `*.workers.dev` first**

Before cutting over DNS, verify everything works on the `bayphillips-blog.workers.dev` subdomain.

**Step 10.3: Update DNS records**

If DNS is already on Cloudflare:
- Remove existing A/CNAME records pointing to Vercel
- The Worker route binding handles traffic automatically

If DNS is elsewhere:
- Transfer DNS to Cloudflare, or
- Set up a CNAME pointing to your Worker's `*.workers.dev` domain

**Step 10.4: Update hardcoded URLs**

Update `app/sitemap.ts` which has hardcoded `https://bayphillips.com` — this should continue to work but verify.

---

## 11. CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Workers

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - run: npm ci

      - name: Run tests
        run: npm test

      - name: Run linting
        run: npm run lint

      - name: Build and Deploy
        if: github.ref == 'refs/heads/main'
        run: npx @opennextjs/cloudflare build && npx @opennextjs/cloudflare deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}

      - name: Preview (PRs)
        if: github.event_name == 'pull_request'
        run: npx @opennextjs/cloudflare build && npx @opennextjs/cloudflare upload
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

### Required GitHub Secrets

| Secret                    | Description                        |
|---------------------------|------------------------------------|
| `CLOUDFLARE_API_TOKEN`    | Cloudflare API token with Workers edit permission |
| `CLOUDFLARE_ACCOUNT_ID`   | Your Cloudflare account ID         |

### Sanity Webhook for Rebuild

Set up a Sanity webhook to trigger a GitHub Actions workflow dispatch when content changes, enabling on-demand ISR:

1. In Sanity dashboard: Settings > Webhooks > Add webhook
2. URL: GitHub Actions `repository_dispatch` endpoint
3. Trigger on: Create, Update, Delete for `post` and `settings` document types

---

## 12. Rollback Plan

Since Vercel deployment is git-based, rollback is straightforward:

1. **Immediate rollback**: Change DNS back to Vercel (if DNS is already on Cloudflare, add a CNAME record pointing to `cname.vercel-dns.com`)
2. **Code rollback**: Keep the Vercel configuration (`vercel.json`, Vercel deps) on a branch until the CF deployment is stable for 2+ weeks
3. **Gradual migration**: Use Cloudflare's `upload` command with gradual deployments to roll out incrementally

### Rollback Checklist
- [ ] Vercel project still exists and can be redeployed
- [ ] DNS TTL is set low (e.g., 60s) during cutover period
- [ ] `vercel.json` and Vercel deps preserved on a branch
- [ ] Sanity webhooks can be quickly switched back to Vercel

---

## 13. Known Risks & Mitigations

| Risk | Severity | Mitigation |
|------|----------|------------|
| Worker bundle exceeds size limit | High | Analyze bundle, use multi-worker, or separate Studio |
| Sanity Studio incompatibility in Worker | Medium | Studio is force-static, so it should work. Fallback: deploy separately via `sanity deploy` |
| `next/image` optimization differences | Low | Cloudflare Images binding provides native support; custom loader as fallback |
| Draft mode behavior differences | Low | Uses standard Next.js API, supported by OpenNext |
| Cold start latency | Medium | Cloudflare Workers have minimal cold starts (~0ms for static, low for dynamic). Monitor and optimize bundle size. |
| `styled-components` SSR in Worker | Medium | Should only be in static Studio build, not Worker. Verify. |
| `next/font` Google Fonts loading | Low | Supported by OpenNext adapter |
| Missing Node.js APIs in Workers | Medium | `nodejs_compat` flag provides most APIs. Test thoroughly with `npm run preview`. |
| R2 cache consistency | Low | R2 is eventually consistent; acceptable for a blog |
| Sanity real-time preview (Visual Editing) | Medium | Depends on WebSocket/long-polling support in Workers. Test draft mode thoroughly. |

---

## Summary: Migration Checklist

- [ ] Install `@opennextjs/cloudflare` and `wrangler`
- [ ] Create `wrangler.jsonc` with correct compatibility date and flags
- [ ] Create `open-next.config.ts` with R2 incremental cache
- [ ] Remove `output: 'standalone'` from `next.config.js`
- [ ] Configure image optimization (Images binding or custom loader)
- [ ] Remove Vercel-specific packages and code
- [ ] Add Cloudflare Web Analytics (or alternative)
- [ ] Create R2 bucket for ISR cache
- [ ] Set environment variables and secrets in Cloudflare
- [ ] Add `.open-next` to `.gitignore`
- [ ] Build and verify locally with `npm run preview`
- [ ] Analyze Worker bundle size — ensure under limits
- [ ] Deploy to `*.workers.dev` and test
- [ ] Configure custom domain and DNS
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Configure Sanity webhook for content change deployments
- [ ] Set up Workers VPC if private networking is needed
- [ ] Monitor for 2 weeks before removing Vercel fallback
- [ ] Delete `vercel.json` and Dockerfile after stable period

---

## References

- [OpenNext Cloudflare Adapter - Get Started](https://opennext.js.org/cloudflare/get-started)
- [OpenNext Cloudflare - Image Optimization](https://opennext.js.org/cloudflare/howtos/image)
- [OpenNext Cloudflare - Troubleshooting](https://opennext.js.org/cloudflare/troubleshooting)
- [OpenNext Cloudflare - Multi Worker](https://opennext.js.org/cloudflare/howtos/multi-worker)
- [Cloudflare Workers - Next.js Guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
- [Cloudflare Workers VPC](https://developers.cloudflare.com/workers-vpc/)
- [Cloudflare Workers VPC - Get Started](https://developers.cloudflare.com/workers-vpc/get-started/)
- [Cloudflare Tunnel Configuration](https://developers.cloudflare.com/workers-vpc/configuration/tunnel/)
- [Cloudflare Images - Framework Integration](https://developers.cloudflare.com/images/transform-images/integrate-with-frameworks/)
- [Cloudflare Blog - Deploying Next.js with OpenNext](https://blog.cloudflare.com/deploying-nextjs-apps-to-cloudflare-workers-with-the-opennext-adapter/)
- [Cloudflare Blog - Workers VPC Open Beta](https://blog.cloudflare.com/workers-vpc-open-beta/)
- [GitHub - opennextjs/opennextjs-cloudflare](https://github.com/opennextjs/opennextjs-cloudflare)
