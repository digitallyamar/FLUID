import { expect, test } from "@playwright/test";

const routes = [
  "/components/tabs",
  "/components/accordion",
  "/components/tooltip",
  "/components/popover",
  "/components/dropdown-menu",
  "/components/toast",
  "/components/badge",
  "/components/avatar",
  "/components/pagination",
  "/components/breadcrumb"
];

for (const route of routes) {
  test(`tier-b accessibility smoke ${route}`, async ({ page }) => {
    await page.goto(`http://localhost:3000${route}`);
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Accessibility" })).toBeVisible();
  });
}
