// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { createTheme } from "../../packages/fluid-react/src/tokens/createTheme";
import {
  applyThemeVariables,
  clearThemeVariables,
  themeContractToVariables
} from "../../packages/fluid-react/src/tokens/runtime";

describe("runtime theme variables", () => {
  it("maps ThemeContract values to known FLUID CSS variables", () => {
    const theme = createTheme({
      color: {
        primary: "#112233",
        surface: "#ffffff",
        text: "#0f172a",
        muted: "#334155"
      },
      spacing: { md: "16px" },
      radius: { md: "8px" },
      typography: { body: "16px/1.5" },
      shadow: { sm: "0 1px 2px rgba(0,0,0,.1)" },
      motion: { fast: "120ms" }
    });

    const variables = themeContractToVariables(theme);
    expect(variables["--fluid-color-accent"]).toBe("#112233");
    expect(variables["--fluid-color-bg"]).toBe("#ffffff");
    expect(variables["--fluid-color-text-primary"]).toBe("#0f172a");
    expect(variables["--fluid-color-text-muted"]).toBe("#334155");
  });

  it("applies and clears variables on a target element", () => {
    const target = document.createElement("div");
    const variables = {
      "--fluid-color-accent": "#123456",
      "--fluid-color-theme": "#f59e0b"
    };

    applyThemeVariables(variables, target);
    expect(target.style.getPropertyValue("--fluid-color-accent")).toBe("#123456");
    expect(target.style.getPropertyValue("--fluid-color-theme")).toBe("#f59e0b");

    clearThemeVariables(Object.keys(variables), target);
    expect(target.style.getPropertyValue("--fluid-color-accent")).toBe("");
    expect(target.style.getPropertyValue("--fluid-color-theme")).toBe("");
  });
});
