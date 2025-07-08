// tests/e2e/posts.spec.ts

import { test, expect } from '@playwright/test';

test('Posts page should display a collection of blog posts', async ({ page }) => {
  await page.goto('/posts');
  // Assuming each post has a card with the class 'post-card'
  const posts = await page.locator('#posts').locator('.post');
  const count = await posts.count();
  expect(count).toBeGreaterThan(0);
});