import type { ThemeContract } from "./contract";

export function createTheme(input: Partial<ThemeContract>): ThemeContract {
  const required = ["color", "spacing", "radius", "typography", "shadow", "motion"] as const;
  for (const key of required) {
    if (!input[key] || Object.keys(input[key] as object).length === 0) {
      throw new Error(`missing token group: ${key}`);
    }
  }
  return input as ThemeContract;
}
