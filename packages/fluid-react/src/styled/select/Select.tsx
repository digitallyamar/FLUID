import React from "react";
import { useSelect } from "../../headless/select/useSelect.js";
import type { SelectProps } from "./types.js";

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", children, ...props }, ref) => {
    const behavior = useSelect(props);
    return (
      <select ref={ref} {...behavior} className={`fluid-select ${className}`.trim()}>
        {children}
      </select>
    );
  }
);
