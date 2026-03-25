import { expect, test } from "@playwright/test";

test("academy learning doc is reachable from home and renders markdown", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByRole("link", { name: "Browse Academy Notes" })).toBeVisible();
  await page.getByRole("link", { name: "Browse Academy Notes" }).click();
  await expect(page).toHaveURL("http://localhost:3000/academy");
  await expect(page.getByRole("link", { name: "First Principles Web Fundamentals" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Session Handoff Guide" })).toBeVisible();
  await expect(page.getByRole("link", { name: "First-Principles Question Bank" })).toBeVisible();
  await expect(page.getByRole("link", { name: "FLUID Library Structure Map" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Button Component Deep Dive" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Mobile Readiness Backlog" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Backlog Index" })).toBeVisible();
  await page.getByRole("link", { name: "First Principles Web Fundamentals" }).click();
  await expect(page).toHaveURL("http://localhost:3000/academy/first-principles");
  await expect(page.getByRole("heading", { name: "Academy: First Principles" })).toBeVisible();
  await expect(page.getByText("The Smallest Mental Model of the Web")).toBeVisible();

  await page.goto("http://localhost:3000/academy");
  await page.getByRole("link", { name: "First-Principles Question Bank" }).click();
  await expect(page).toHaveURL("http://localhost:3000/academy/question-bank");
  await expect(page.getByRole("heading", { name: "Academy: First-Principles Question Bank" })).toBeVisible();
  await expect(page.getByText("Core First-Principles Questions")).toBeVisible();

  await page.goto("http://localhost:3000/academy");
  await page.getByRole("link", { name: "Button Component Deep Dive" }).click();
  await expect(page).toHaveURL("http://localhost:3000/academy/button-deep-dive");
  await expect(page.getByRole("heading", { name: "Academy: Button Component Deep Dive" })).toBeVisible();
  await expect(page.getByText("Where The Button Code Lives")).toBeVisible();

  await page.goto("http://localhost:3000/academy");
  await page.getByRole("link", { name: "Backlog Index" }).click();
  await expect(page).toHaveURL("http://localhost:3000/academy/backlogs");
  await expect(page.getByRole("heading", { name: "Academy: Backlog Index" })).toBeVisible();
  await expect(page.getByText("Current Backlogs")).toBeVisible();
});
