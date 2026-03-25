import React from "react";
import type { PopoverProps } from "./types.js";

export function Popover({ trigger, content, className = "", ...props }: PopoverProps) {
  return (
    <div {...props} className={`fluid-popover ${className}`.trim()}>
      <div className="fluid-popover-trigger">{trigger}</div>
      <div className="fluid-popover-panel">{content}</div>
    </div>
  );
}
