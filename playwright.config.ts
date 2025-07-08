// playwright.config.ts

import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run dev', // Command to start your Next.js development server
    port: 3000,             // Port the server runs on
    timeout: 120 * 1000,    // Timeout for starting the server (120 seconds)
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:3000', // Base URL for navigation
  },
});