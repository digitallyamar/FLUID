import { createTheme } from "../createTheme.js";

export const medicinePreset = createTheme({
  color: { primary: "#0f766e", surface: "#ffffff" },
  spacing: { sm: "8px", md: "16px" },
  radius: { md: "8px" },
  typography: { body: "16px/1.5" },
  shadow: { sm: "0 1px 2px rgba(15,118,110,.2)" },
  motion: { fast: "120ms" }
});
