# Next.js/Sanity Blog Repository - Copilot Agent Instructions

## Repository Overview

This is a Next.js 15 blog application built with Sanity.io as the content management system. The site is hosted on Vercel and uses Tailwind CSS for styling. The repository contains a complete blog implementation with posts, authors, tags, and a Sanity Studio for content management.

### Project Structure
- **Framework**: Next.js 15 (App Router)
- **CMS**: Sanity.io (with custom schema)
- **Styling**: Tailwind CSS
- **Build Tool**: Next.js build system
- **Testing**: Playwright end-to-end tests
- **TypeScript**: Strongly typed with generated Sanity types

### Key Directories
- `app/` - Next.js App Router pages and components
- `components/` - Shared React components
- `lib/` - Utility functions and Sanity integration
- `sanity/` - Sanity configuration and schema definitions
- `tests/` - End-to-end Playwright tests
- `public/studio/` - Sanity Studio static files

## Build and Development Setup

### Prerequisites
- Node.js 18+ (recommended version specified in .nvmrc)
- npm 8+ (or yarn, pnpm)

### Environment Setup
1. Install dependencies: `npm install`
2. Set up environment variables by copying `.env.local.example` to `.env.local` and filling in values
3. Run Sanity setup: `npm run setup` (requires Sanity CLI installed globally)

### Build Commands
- **Development**: `npm run dev` (starts Next.js dev server with Turbopack)
- **Build**: `npm run build` (creates production build)
- **Lint**: `npm run lint` (runs ESLint - note: may have TypeScript version warnings)
- **Test**: `npm run test:e2e` (runs Playwright end-to-end tests)

### Build Process Details
1. `npm run typegen` - Generates TypeScript types from Sanity schema
2. `npm run build` - Builds the Next.js application
3. `npm run test:e2e` - Runs Playwright tests

### Validation Steps
1. Run `npm run build` to ensure no build errors
2. Run `npm run test:e2e` to ensure all tests pass
3. Verify that the development server starts successfully with `npm run dev`

## Key Files and Architecture

### Main Configuration Files
- `next.config.js` - Next.js configuration with image optimization and security settings
- `tsconfig.json` - TypeScript configuration with path aliases
- `tailwind.config.ts` - Tailwind CSS configuration
- `sanity.config.ts` - Sanity Studio configuration
- `package.json` - Scripts and dependencies

### Core Components
- `app/(blog)/page.tsx` - Main blog homepage
- `app/(blog)/posts/[slug]/page.tsx` - Individual post page
- `components/post-card.tsx` - Post card component
- `lib/sanity/fetch.ts` - Sanity data fetching utilities
- `sanity/schemas/documents/post.ts` - Post schema definition

### Sanity Integration
- Uses `next-sanity` for integration with Sanity
- Generated types in `sanity.types.ts` for type safety
- Custom schema with posts, authors, settings, and about/contact pages
- Studio at `/studio` route

## Testing and Validation

### Test Suite
- End-to-end tests in `tests/e2e/`
- Tests cover homepage, posts page, and individual post detail
- Tests run with Playwright

### CI/CD Pipeline
- Build and test validation via npm scripts
- GitHub Actions workflows (not shown in repo but implied by project structure)

## Development Guidelines

### Code Style
- TypeScript with strict typing
- Prettier for code formatting
- ESLint for linting (note: may have TypeScript version warnings)
- Component naming: PascalCase
- Variable names: camelCase
- Imports: Prefer relative paths

### Best Practices
1. Always run `npm run typegen` before building to ensure Sanity types are up to date
2. Run `npm run build` before committing to ensure no build errors
3. Run `npm run test:e2e` to verify all tests pass
4. Use `npm run dev` to test locally before deployment
5. When adding new components, ensure they follow the existing component structure
6. When modifying Sanity schemas, always run `npm run typegen` after changes

### Common Issues and Workarounds
1. ESLint warnings about TypeScript version - these are known and can be ignored for development
2. Build may fail if Sanity environment variables are not set - ensure `.env.local` is properly configured
3. If you encounter "Cannot read properties of undefined (reading 'allowShortCircuit')" errors, it's likely due to ESLint version incompatibility - this is a known issue and doesn't affect functionality

## Deployment

The application is designed to be deployed on Vercel. The build process:
1. Generates TypeScript types from Sanity schema
2. Builds the Next.js application
3. Extracts Sanity manifest for the studio

## Key Implementation Details

### Data Fetching
- Uses `next-sanity` for fetching data from Sanity
- Implements proper data fetching utilities in `lib/sanity/fetch.ts`
- Uses GROQ queries for content retrieval

### Routing
- Uses Next.js App Router (`app/` directory)
- Implements dynamic routes for posts (`[slug]`) and tags (`[tag]`)

### Styling
- Uses Tailwind CSS with custom configuration
- Implements responsive design patterns
- Uses Radix UI components for UI primitives

### Content Management
- Sanity Studio integrated at `/studio`
- Custom schema for posts, authors, settings, and pages
- Uses `sanity-plugin-asset-source-unsplash` for image assets

## Troubleshooting

### Common Commands
- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run test:e2e` - Run end-to-end tests
- `npm run typegen` - Generate Sanity types
- `npm run lint` - Run ESLint (may show TypeScript version warnings)

### Error Handling
- Build errors typically indicate missing environment variables or schema issues
- Test failures usually relate to content or routing issues
- ESLint errors are often due to TypeScript version incompatibilities but don't affect functionality

## Repository Size and Complexity

This repository is a medium-sized Next.js application with:
- ~100+ files
- TypeScript with strong typing
- Sanity CMS integration
- End-to-end testing
- Component-based architecture

The codebase is well-structured with clear separation of concerns between Next.js pages, Sanity configuration, and shared components.