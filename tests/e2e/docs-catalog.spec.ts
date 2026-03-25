import { expect, test } from "@playwright/test";

test("root links to component catalog and catalog lists component routes", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByRole("link", { name: "Browse Components" })).toBeVisible();
  await page.getByRole("link", { name: "Browse Components" }).click();
  await expect(page).toHaveURL("http://localhost:3000/components");

  const expectedLinks = [
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

  for (const href of expectedLinks) {
    await expect(page.locator(`a[href='${href}']`)).toBeVisible();
  }
});
