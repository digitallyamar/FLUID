import React from "react";
import type { TooltipProps } from "./types.js";

export function Tooltip({ content, children, className = "", ...props }: TooltipProps) {
  const tooltipText = typeof content === "string" ? content : "";

  return (
    <span
      {...props}
      className={`fluid-tooltip ${className}`.trim()}
      data-tooltip={tooltipText}
      title={tooltipText || undefined}
    >
      {children}
    </span>
  );
}
