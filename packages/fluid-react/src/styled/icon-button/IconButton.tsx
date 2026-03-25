import React from "react";
import { useIconButton } from "../../headless/icon-button/useIconButton.js";
import type { IconButtonProps } from "./types.js";

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className = "", children, ...props }, ref) => {
    const behavior = useIconButton(props);
    return (
      <button ref={ref} {...props} {...behavior} className={`fluid-btn fluid-icon-btn ${className}`.trim()}>
        {children}
      </button>
    );
  }
);
