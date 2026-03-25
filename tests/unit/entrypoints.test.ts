import { describe, expect, it } from "vitest";
import * as root from "../../packages/fluid-react/src/index";
import * as headless from "../../packages/fluid-react/src/headless";
import * as tokens from "../../packages/fluid-react/src/tokens";
import { createTailwindPreset } from "../../packages/fluid-react/src/tailwind-preset";

describe("entrypoints", () => {
  it("exposes required public entrypoints", () => {
    expect(root).toHaveProperty("Button");
    expect(headless).toHaveProperty("useButton");
    expect(tokens).toHaveProperty("createTheme");
    expect(tokens).toHaveProperty("themeContractToVariables");
    expect(tokens).toHaveProperty("applyThemeVariables");
    expect(tokens).toHaveProperty("clearThemeVariables");
  });

  it("exposes tailwind preset contract", () => {
    const preset = createTailwindPreset({
      color: { primary: "#111111" },
      spacing: { md: "16px" },
      radius: { md: "8px" },
      typography: { body: "16px/1.5" },
      shadow: { sm: "0 1px 2px rgba(0,0,0,.1)" },
      motion: { fast: "120ms" }
    });
    expect(preset.theme.extend.colors.primary).toBe("#111111");
  });

  it("declares tailwind preset export map", async () => {
    const pkg = await import("../../packages/fluid-react/package.json");
    expect(pkg.default.exports["./tailwind-preset"]).toBe("./dist/tailwind-preset.js");
  });
});
