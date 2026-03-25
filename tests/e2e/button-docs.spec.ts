import { expect, test } from "@playwright/test";

test("button docs page has required sections", async ({ page }) => {
  await page.goto("http://localhost:3000/components/button");
  await expect(page.getByText("Default")).toBeVisible();
  await expect(page.getByText("Variants")).toBeVisible();
  await expect(page.getByText("Disabled")).toBeVisible();
  await expect(page.getByText("Theming")).toBeVisible();
  await expect(page.getByText("Accessibility")).toBeVisible();
});
