import next from 'eslint-config-next';

const config = [
  ...next,
  {
    ignores: ['./sanity.types.ts'],
  },
];

export default config;
