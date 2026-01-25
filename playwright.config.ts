// playwright.config.ts

import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  webServer: {
    command: 'npm run dev',
    port: 3001,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:3001',
    navigationTimeout: 30000,
  },
});