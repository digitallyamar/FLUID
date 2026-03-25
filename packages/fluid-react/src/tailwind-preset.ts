import type { ThemeContract } from "./tokens/contract";

export function createTailwindPreset(theme: ThemeContract) {
  return {
    theme: {
      extend: {
        colors: theme.color,
        spacing: theme.spacing,
        borderRadius: theme.radius,
        boxShadow: theme.shadow
      }
    }
  };
}
