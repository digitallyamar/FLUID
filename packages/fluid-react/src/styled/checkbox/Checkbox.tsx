import React from "react";
import { useCheckbox } from "../../headless/checkbox/useCheckbox.js";
import type { CheckboxProps } from "./types.js";

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className = "", ...props }, ref) => {
  const behavior = useCheckbox(props);
  return <input ref={ref} {...behavior} className={`fluid-checkbox ${className}`.trim()} />;
});
