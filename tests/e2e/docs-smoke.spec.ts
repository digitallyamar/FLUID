import { expect, test } from "@playwright/test";

test("docs renders catalog and maturity cues with semantic structure", async ({ page }) => {
  await page.goto("http://localhost:3000/components");

  await expect(page.getByRole("heading", { level: 1, name: "Components" })).toBeVisible();
  await expect(page.getByText("Tier A")).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page).toHaveTitle(/FLUID Docs/);

  await page.goto("http://localhost:3000/components/button");
  await expect(page.getByRole("heading", { level: 1, name: "Button" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Accessibility" })).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
});
