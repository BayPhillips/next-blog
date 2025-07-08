import { test, expect } from '@playwright/test';

test('Homepage should display hero content', async ({ page }) => {
  await page.goto('/');
  // Assuming there's a hero section with specific text
  const heroContent = await page.locator('.hero');
  await expect(heroContent).toBeVisible();
});