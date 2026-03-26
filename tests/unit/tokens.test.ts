import { describe, expect, it } from "vitest";
import {
  constructionPreset,
  createTheme,
  medicinePreset
} from "../../packages/fluid-react/src/tokens";

describe("createTheme", () => {
  it("returns validated theme", () => {
    const theme = createTheme({
      color: { primary: "#0f172a", surface: "#ffffff" },
      spacing: { sm: "8px", md: "16px" },
      radius: { md: "8px" },
      typography: { body: "16px/1.5" },
      shadow: { sm: "0 1px 2px rgba(0,0,0,0.1)" },
      motion: { fast: "120ms" }
    });
    expect(theme.color.primary).toBe("#0f172a");
  });

  it("throws on invalid token shape", () => {
    expect(() => createTheme({ color: {} } as never)).toThrow(/missing/i);
  });

  it("exports built-in domain presets", () => {
    for (const preset of [constructionPreset, medicinePreset]) {
      expect(preset.color.primary).toBeTruthy();
      expect(preset.spacing.md).toBeTruthy();
      expect(preset.radius.md).toBeTruthy();
      expect(preset.typography.body).toBeTruthy();
      expect(preset.shadow.sm).toBeTruthy();
      expect(preset.motion.fast).toBeTruthy();
    }
  });
});
