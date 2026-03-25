import React from "react";
import type { BadgeProps } from "./types.js";

export function Badge({ children, className = "", ...props }: BadgeProps) {
  return (
    <span {...props} className={`fluid-badge ${className}`.trim()}>
      {children}
    </span>
  );
}
