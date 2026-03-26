import { Button } from "@fluid-ui/react";
import { createTailwindPreset } from "@fluid-ui/react/tailwind-preset";
import "@fluid-ui/react/styles.css";

const preset = createTailwindPreset({
  color: { primary: "#0f172a", surface: "#ffffff", text: "#111111", muted: "#64748b", theme: "#2563eb" },
  spacing: { sm: "8px", md: "16px" },
  radius: { md: "8px" },
  typography: { body: "16px/1.5" },
  shadow: { sm: "0 1px 2px rgba(0,0,0,0.1)" },
  motion: { fast: "120ms" }
});

export { Button, preset };
