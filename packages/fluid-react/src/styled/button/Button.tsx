import React from "react";
import { useButton } from "../../headless/button/useButton";
import type { ButtonProps } from "./types";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", children, ...props }, ref) => {
    const behavior = useButton(props);
    return (
      <button ref={ref} {...props} {...behavior} className={`fluid-btn ${className}`.trim()}>
        {children}
      </button>
    );
  }
);
