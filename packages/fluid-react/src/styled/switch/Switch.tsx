import React from "react";
import { useSwitch } from "../../headless/switch/useSwitch.js";
import type { SwitchProps } from "./types.js";

export function Switch({ className = "", ...props }: SwitchProps) {
  const { initialChecked } = useSwitch(false);
  const [checked, setChecked] = React.useState(initialChecked);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked ? "true" : "false"}
      {...props}
      className={`fluid-switch ${className}`.trim()}
      onClick={(e) => {
        setChecked((v) => !v);
        props.onClick?.(e);
      }}
    />
  );
}
