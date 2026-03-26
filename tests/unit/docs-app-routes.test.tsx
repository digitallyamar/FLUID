// @vitest-environment jsdom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DocsApp } from "../../apps/docs/src/DocsApp";

afterEach(() => {
  cleanup();
});

describe("DocsApp Tier B routes", () => {
  it("renders components index route with theme dashboard controls", () => {
    window.history.pushState({}, "", "/components");
    render(<DocsApp />);
    expect(screen.getByRole("main")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1, name: "Components" })).toBeTruthy();
    expect(screen.getByLabelText("Theme profile")).toBeTruthy();
    expect(screen.getByLabelText("Primary color token")).toBeTruthy();
  });

  it("renders tooltip route", () => {
    window.history.pushState({}, "", "/components/tooltip");
    render(<DocsApp />);
    expect(screen.getByRole("main")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    expect(screen.getByLabelText("Theme profile")).toBeTruthy();
    expect(screen.getByLabelText("Theme accent token")).toBeTruthy();
  });

  it("renders toast route", () => {
    window.history.pushState({}, "", "/components/toast");
    render(<DocsApp />);
    expect(screen.getByRole("main")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    expect(screen.getByLabelText("Theme profile")).toBeTruthy();
  });

  it("renders dedicated theme dashboard route", () => {
    window.history.pushState({}, "", "/theme-dashboard");
    render(<DocsApp />);
    expect(screen.getByRole("heading", { level: 1, name: "Theme Dashboard" })).toBeTruthy();
    expect(screen.getByLabelText("Theme profile")).toBeTruthy();
    expect(screen.getByLabelText("Primary color token")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Reset Theme Colors" })).toBeTruthy();
  });
});
