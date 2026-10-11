import next from 'eslint-config-next';

const config = [
  ...next,
  {
    ignores: ['sanity.types.ts', '.next/**', 'public/studio/**', 'coverage/**', 'test-results/**', 'playwright-report/**', 'dist/**', '.wrangler/**', '.vercel/**', '.claude/**', '.sanity/**'],
  },
];

export default config;
