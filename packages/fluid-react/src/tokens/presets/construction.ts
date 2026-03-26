import { createTheme } from "../createTheme.js";

export const constructionPreset = createTheme({
  color: { primary: "#1f2937", surface: "#ffffff" },
  spacing: { sm: "8px", md: "16px" },
  radius: { md: "6px" },
  typography: { body: "16px/1.5" },
  shadow: { sm: "0 1px 2px rgba(0,0,0,.12)" },
  motion: { fast: "120ms" }
});
