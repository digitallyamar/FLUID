import { expect, test } from "@playwright/test";

test("academy learning doc is reachable from home and renders markdown", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByRole("link", { name: "Read Learning Doc: First Principles" })).toBeVisible();
  await page.getByRole("link", { name: "Read Learning Doc: First Principles" }).click();
  await expect(page).toHaveURL("http://localhost:3000/academy/first-principles");
  await expect(page.getByRole("heading", { name: "Academy: First Principles" })).toBeVisible();
  await expect(page.getByText("The Smallest Mental Model of the Web")).toBeVisible();
});
