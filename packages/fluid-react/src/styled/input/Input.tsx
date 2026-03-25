import React from "react";
import { useInput } from "../../headless/input/useInput.js";
import type { InputProps } from "./types.js";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = "", ...props }, ref) => {
  const behavior = useInput(props);
  return <input ref={ref} {...behavior} className={`fluid-input ${className}`.trim()} />;
});
