// tests/e2e/post-detail.spec.ts

import { test, expect } from '@playwright/test';

test('Individual blog post should render all necessary components', async ({ page }) => {
  // First navigate to the posts page and click on a post link
  await page.goto('/posts/diving-into-ai-as-a-jaded-technologist');

  await expect(page.locator('.post-header')).toBeVisible();
  await expect(page.locator('.cover-image')).toBeVisible();
  await expect(page.locator('.post-content')).toBeVisible();
});