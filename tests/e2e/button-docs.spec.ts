import { expect, test } from "@playwright/test";

test("button docs page has required sections", async ({ page }) => {
  await page.goto("http://localhost:3000/components/button");
  await expect(page.getByRole("heading", { level: 2, name: "Default" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Variants" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Disabled" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Theming" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Accessibility" })).toBeVisible();
  const button = page.getByRole("button", { name: "Default" }).first();
  await expect(button).toBeVisible();
  const borderRadius = await button.evaluate(
    (el) => window.getComputedStyle(el as HTMLElement).borderRadius
  );
  expect(borderRadius).toBe("8px");
});
