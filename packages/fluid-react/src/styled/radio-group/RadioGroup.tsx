import React from "react";
import { useRadioGroup } from "../../headless/radio-group/useRadioGroup.js";
import type { RadioGroupProps } from "./types.js";

export function RadioGroup({ name, options, ...props }: RadioGroupProps) {
  const data = useRadioGroup({ name, options });
  return (
    <fieldset aria-label={props["aria-label"] as string | undefined}>
      {data.options.map((opt) => (
        <label key={opt.value}>
          <input type="radio" name={name} value={opt.value} />
          {opt.label}
        </label>
      ))}
    </fieldset>
  );
}
