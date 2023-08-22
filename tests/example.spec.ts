import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto("http://localhost:3000");
  const name = await page.innerText("h1");
  expect(name).toBe("Hello Adri");
});
