import React from "react";
import { useRadioGroup } from "../../headless/radio-group/useRadioGroup.js";
import type { RadioGroupProps } from "./types.js";

export function RadioGroup({ name, options, className = "", ...props }: RadioGroupProps) {
  const data = useRadioGroup({ name, options });
  return (
    <fieldset
      aria-label={props["aria-label"] as string | undefined}
      className={`fluid-radio-group ${className}`.trim()}
    >
      {data.options.map((opt) => (
        <label key={opt.value} className="fluid-radio-group-option">
          <input className="fluid-radio-group-input" type="radio" name={name} value={opt.value} />
          {opt.label}
        </label>
      ))}
    </fieldset>
  );
}
