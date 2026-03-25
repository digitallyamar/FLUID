import React from "react";
import type { PopoverProps } from "./types.js";

export function Popover({ trigger, content, ...props }: PopoverProps) {
  return (
    <div {...props}>
      <div>{trigger}</div>
      <div>{content}</div>
    </div>
  );
}
