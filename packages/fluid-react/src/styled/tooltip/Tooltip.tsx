import React from "react";
import type { TooltipProps } from "./types.js";

export function Tooltip({ content, children, ...props }: TooltipProps) {
  return (
    <span {...props} title={typeof content === "string" ? content : undefined}>
      {children}
    </span>
  );
}
