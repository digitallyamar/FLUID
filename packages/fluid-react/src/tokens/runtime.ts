import type { ThemeContract } from "./contract.js";

export type ThemeVariableMap = Record<`--${string}`, string>;
export type RuntimeThemeOverrideInput = {
  theme: ThemeContract;
  themeId?: string;
  target?: HTMLElement;
};
export type RuntimeThemeOverrideResult = {
  variableNames: string[];
};

const colorTokenVariableMap: Record<string, `--fluid-${string}`> = {
  primary: "--fluid-color-accent",
  surface: "--fluid-color-bg",
  text: "--fluid-color-text-primary",
  muted: "--fluid-color-text-muted",
  theme: "--fluid-color-theme",
  border: "--fluid-color-border",
  focus: "--fluid-color-focus"
};

function mapScaleToVariables(
  prefix: string,
  scale: Record<string, string>,
  variables: ThemeVariableMap
) {
  for (const [key, value] of Object.entries(scale)) {
    variables[`--fluid-${prefix}-${key}`] = value;
  }
}

export function themeContractToVariables(theme: ThemeContract): ThemeVariableMap {
  const variables: ThemeVariableMap = {};

  for (const [key, value] of Object.entries(theme.color)) {
    const mappedVariable = colorTokenVariableMap[key];
    if (mappedVariable) {
      variables[mappedVariable] = value;
    }
    variables[`--fluid-color-${key}`] = value;
  }

  mapScaleToVariables("spacing", theme.spacing, variables);
  mapScaleToVariables("radius", theme.radius, variables);
  mapScaleToVariables("typography", theme.typography, variables);
  mapScaleToVariables("shadow", theme.shadow, variables);
  mapScaleToVariables("motion", theme.motion, variables);

  return variables;
}

export function applyThemeVariables(
  variables: ThemeVariableMap,
  target: HTMLElement = document.documentElement
) {
  for (const [name, value] of Object.entries(variables)) {
    target.style.setProperty(name, value);
  }
}

export function applyRuntimeThemeOverride({
  theme,
  themeId,
  target = document.documentElement
}: RuntimeThemeOverrideInput): RuntimeThemeOverrideResult {
  const variables = themeContractToVariables(theme);
  applyThemeVariables(variables, target);
  if (themeId) {
    target.setAttribute("data-fluid-theme", themeId);
  }

  return { variableNames: Object.keys(variables) };
}

export function clearThemeVariables(
  variableNames: string[],
  target: HTMLElement = document.documentElement
) {
  for (const variableName of variableNames) {
    target.style.removeProperty(variableName);
  }
}
