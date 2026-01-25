import { test, expect } from '@playwright/test';

test('Homepage loads and displays content', async ({ page }) => {
  await page.goto('/');

  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector('main, .container, body', { timeout: 10000 });

  const title = await page.title();
  expect(title).toBeTruthy();
});

test('Homepage has navigation', async ({ page }) => {
  await page.goto('/');

  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector('a', { timeout: 10000 });

  const linkCount = await page.locator('a').count();
  expect(linkCount).toBeGreaterThan(0);
});