import { test, expect } from '@playwright/test';

test('home page exists', async ({ page }) => {
  await page.goto('');

  await expect(page.getByRole('heading', { name: 'Welcome to Camberley 478 scout group' })).toBeVisible();
});
