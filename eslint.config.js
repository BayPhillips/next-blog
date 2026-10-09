import next from 'eslint-config-next';

const config = [
  ...next,
  {
    ignores: ['./sanity.types.ts', '.next/**', 'dist/**', 'public/studio/**'],
  },
];

export default config;
