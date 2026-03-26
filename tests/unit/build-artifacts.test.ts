import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("build artifacts", () => {
  it("produces fluid.css and tailwind preset export", () => {
    expect(existsSync("packages/fluid-react/dist/index.js")).toBe(true);
    expect(existsSync("packages/fluid-react/dist/index.d.ts")).toBe(true);
    expect(existsSync("packages/fluid-react/src/styles/dist/fluid.css")).toBe(true);
    expect(existsSync("packages/fluid-react/dist/tailwind-preset.js")).toBe(true);
  });
});
