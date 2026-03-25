import { expect, test } from "@playwright/test";

const routes = [
  "/components/button",
  "/components/icon-button",
  "/components/input",
  "/components/textarea",
  "/components/select",
  "/components/checkbox",
  "/components/radio-group",
  "/components/switch",
  "/components/card",
  "/components/modal"
];

for (const route of routes) {
  test(`tier-a accessibility smoke ${route}`, async ({ page }) => {
    await page.goto(`http://localhost:3000${route}`);
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Accessibility" })).toBeVisible();
  });
}
