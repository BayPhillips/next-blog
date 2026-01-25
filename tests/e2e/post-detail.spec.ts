import { test, expect } from '@playwright/test';

test('Post detail page loads and displays content', async ({ page }) => {
  await page.goto('/posts/2025-year-in-review');

  await page.waitForLoadState('domcontentloaded');

  await page.waitForTimeout(3000);

  const bodyText = await page.locator('body').textContent();
  if (!bodyText) throw new Error('No body text found');

  expect(bodyText.length).toBeGreaterThan(10);
});