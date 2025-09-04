# AGENTS Guidelines for next-blog

## Build/Lint/Test

- Build: `npm run build`
- Lint: `npm run lint`
- Test: `npm run test`
- Run single test: `npm run test -- --testNamePattern='TestName'`

## Code Style

- TypeScript with `tsconfig.json`
- Prettier (`.prettierignore`, `.prettierconfig`)
- ESLint (`.eslintrc`)
- Component naming: PascalCase
- Variable names: camelCase
- Imports: Prefer relative paths
- Error handling: Use try/catch with logging

## Cursor Rules

- No explicit Cursor rules found in `.continue/`
- No Copilot instructions in `.github/`
- Follow standard Next.js/TypeScript conventions

## Notes

- Use `next/dynamic` for dynamic imports
- UI components in `components/ui/` follow shared styles
- Post content uses MDX in `app/posts/[slug]`
