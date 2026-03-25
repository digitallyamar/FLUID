// @vitest-environment jsdom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DocsApp } from "../../apps/docs/src/DocsApp";

afterEach(() => {
  cleanup();
});

describe("DocsApp Tier B routes", () => {
  it("renders tooltip route", () => {
    window.history.pushState({}, "", "/components/tooltip");
    render(<DocsApp />);
    expect(screen.getByRole("main")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
  });

  it("renders toast route", () => {
    window.history.pushState({}, "", "/components/toast");
    render(<DocsApp />);
    expect(screen.getByRole("main")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
  });
});
