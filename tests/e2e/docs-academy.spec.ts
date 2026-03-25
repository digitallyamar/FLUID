import { expect, test } from "@playwright/test";

test("academy learning doc is reachable from home and renders markdown", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByRole("link", { name: "Browse Academy Notes" })).toBeVisible();
  await page.getByRole("link", { name: "Browse Academy Notes" }).click();
  await expect(page).toHaveURL("http://localhost:3000/academy");
  await expect(page.getByRole("link", { name: "First Principles Web Fundamentals" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Session Handoff Guide" })).toBeVisible();
  await page.getByRole("link", { name: "First Principles Web Fundamentals" }).click();
  await expect(page).toHaveURL("http://localhost:3000/academy/first-principles");
  await expect(page.getByRole("heading", { name: "Academy: First Principles" })).toBeVisible();
  await expect(page.getByText("The Smallest Mental Model of the Web")).toBeVisible();
});
