import { test, expect } from '@playwright/test';

test('Posts page loads and displays posts list', async ({ page }) => {
  await page.goto('/posts');

  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector('h1, [role="heading"]', { timeout: 10000 });

  const h1Count = await page.locator('h1').count();
  expect(h1Count).toBeGreaterThan(0);
});