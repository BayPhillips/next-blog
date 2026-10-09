# AGENTS Guidelines for next-blog

Next.js 16 (App Router) blog for bayphillips.com with Sanity.io CMS. TypeScript, Tailwind CSS v4, deployed on Vercel. Node 22 (`.nvmrc`).

## Build/Lint/Test
- Dev: `npm run dev` (Turbopack); build: `npm run build` (webpack — `prebuild` runs Sanity `typegen`, `postbuild` extracts the studio manifest)
- Unit tests: `npm run test` (Jest + jsdom; tests in `__tests__/`); single test: `npm run test -- --testNamePattern='TestName'`
- Coverage: `npm run test:coverage` (enforces 70% thresholds — a plain `npm run test` after adding files can fail coverage if thresholds dip)
- E2E: `npm run test:e2e` (Playwright, specs in `tests/e2e/`; auto-starts dev server on :3000)
- Lint: `npm run lint` (runs `eslint .`). Flat config is `eslint.config.js`; it ignores `sanity.types.ts` and build output (`.next/`, `dist/`, `public/studio/`).
- Typecheck: `npx tsc --noEmit`

## Code Style
- TypeScript strict mode (`noImplicitAny: false`), Prettier, ESLint (flat config; generated `sanity.types.ts` is ignored)
- PascalCase for components; camelCase for variables
- Use `@/` path aliases (`@/*`, `@/components/*`, `@/lib/*`) — most imports are aliased; a few relative imports remain in `app/(blog)/`
- try/catch with logging around data fetching and client actions (see `components/contact-form.tsx`)
- Mixed quote styles exist; match the surrounding file

## Notes
- Content lives in Sanity, NOT MDX. Posts render at `app/(blog)/posts/[slug]/` via GROQ queries in `sanity/lib/queries.ts`
- Dual Sanity integration: `lib/sanity/` = app-side fetching (`fetchSanityData` adds a 5-min in-memory cache); `sanity/lib/` = studio-side client/queries/token
- Run `npm run typegen` after changing schemas in `sanity/schemas/` — regenerates `sanity.types.ts` (`predev`/`prebuild` run it automatically)
- Route groups: `app/(blog)/` = public site, `app/(sanity)/studio/` = CMS studio at `/studio`
- Shared UI components: `components/ui/` (shadcn/Radix, barrel at `components/ui/index.ts`); use `next/dynamic` for dynamic imports
- Env (`.env.local`, see `.env.local.example`): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`
- Vercel deploy builds with `NEXT_TURBOPACK_BUILD=0` (see `vercel.json`); `next.config.js` sets standalone output, Sanity CDN image host, security headers

## Available Skills

<!-- SKILLS_TABLE_START -->
**Use skills when the task matches their purpose:**
- `docx`/`pdf`/`xlsx`/`pptx`: Document operations
- `frontend-design`/`web-artifacts-builder`: Web UIs
- `webapp-testing`: Playwright testing
- `doc-coauthoring`: Docs/proposals/specs
- `canvas-design`/`algorithmic-art`: Visual art
- `mcp-builder`: MCP server development

Invocation: `Bash("openskills read <skill-name>")`
<!-- SKILLS_TABLE_END -->