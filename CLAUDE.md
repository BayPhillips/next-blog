# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 15 blog application with Sanity.io CMS, built for bayphillips.com. Uses App Router, TypeScript, and Tailwind CSS. Hosted on Cloudflare Workers via `@opennextjs/cloudflare`.

## Commands

### Development
```bash
npm run dev              # Start dev server with Turbopack
npm run build            # Production build (uses webpack, not Turbopack)
npm start                # Start production server
```

### Testing
```bash
npm test                 # Run Jest unit tests
npm run test:watch       # Run Jest in watch mode
npm run test:coverage    # Run Jest with coverage report
npm run test:e2e         # Run Playwright end-to-end tests
```

### Sanity
```bash
npm run typegen          # Generate TypeScript types from Sanity schemas
npm run setup            # Initialize Sanity project (first time only)
```

### Other
```bash
npm run lint             # Run ESLint (may show TypeScript version warnings)
```

**Important**: Always run `npm run typegen` after modifying Sanity schemas. The build process runs this automatically via `prebuild` and `predev` hooks.

## Architecture

### Directory Structure

- **app/(blog)/** - Blog pages using Next.js App Router. Route group for public-facing blog.
- **app/(sanity)/** - Sanity Studio route at `/studio`.
- **components/** - Shared React components used across the app.
- **lib/** - Utility functions and Next.js-side integrations.
- **lib/sanity/** - Next.js integration with Sanity (client setup, data fetching).
- **sanity/** - Sanity CMS configuration and schemas.
- **sanity/lib/** - Sanity-side utilities (API client, queries, tokens).
- **sanity/schemas/** - Content schemas (posts, authors, settings).

### Key Patterns

#### Dual Sanity Integration
The codebase has two separate Sanity integrations:

1. **lib/sanity/** - Used by Next.js app for fetching content
   - `fetch.ts` - Data fetching utilities with caching
   - `utils.ts` - Client configuration for the app side

2. **sanity/lib/** - Used by Sanity Studio configuration
   - `client.ts` - Sanity client for studio
   - `queries.ts` - GROQ queries for content
   - `api.ts` - API utilities for studio features

This separation keeps concerns clear: Next.js uses `lib/sanity/` while Sanity Studio uses `sanity/lib/`.

#### Type Generation Flow
1. Sanity schemas defined in `sanity/schemas/`
2. `npm run typegen` extracts schema and generates `sanity.types.ts`
3. Generated types used throughout app for type safety
4. Build process automatically runs typegen via `prebuild`/`predev` hooks

#### Path Aliases
TypeScript configured with path aliases (see tsconfig.json):
- `@/*` - Maps to project root
- `@/components/*` - Maps to `./components/*`
- `@/lib/*` - Maps to `./lib/*`

### Sanity Schema Organization

Schemas in `sanity/schemas/`:
- **documents/** - Content types (posts, authors)
- **singletons/** - Single-instance pages (settings, about, contact)

All schemas auto-imported via schema index file.

### Testing Setup

#### Jest Configuration
- Unit tests in `__tests__/` directories or `*.test.ts` files
- Uses jsdom environment for React component testing
- Coverage thresholds: 70% for branches/functions/lines/statements
- Path aliases mapped in `moduleNameMapper`
- Excludes e2e tests via `testPathIgnorePatterns`

#### Playwright (E2E)
- Tests in `tests/e2e/`
- Run via `npm run test:e2e`

### Build Configuration

- **Development**: Uses Turbopack (`next dev --turbopack`)
- **Production**: Uses webpack (`next build --webpack`)
- **Output**: Cloudflare Workers via `@opennextjs/cloudflare` (no `standalone` mode; use `npx opennextjs-cloudflare build` for deployment builds)
- **Image Optimization**: Configured for Sanity CDN (`cdn.sanity.io`)
- **Security Headers**: CORS, XSS protection, frame options, CSP configured

### Environment Variables

Required variables (see `.env.local.example`):
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Dataset name (usually "production")
- `NEXT_PUBLIC_SANITY_PERSPECTIVE` - Preview mode setting
- `SANITY_API_READ_TOKEN` - Read token for Sanity API

Copy `.env.local.example` to `.env.local` and fill in values.

## Important Notes

- The project uses ES modules (`"type": "module"` in package.json)
- TypeScript `strict` mode enabled with `noImplicitAny: false`
- ESLint may show TypeScript version warnings - these can be ignored
- Always run builds before committing to catch type errors
- Studio accessible at `/studio` route in development and production
