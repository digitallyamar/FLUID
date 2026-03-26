import React from "react";
import type { ToastProps } from "./types.js";

export function Toast({ children, className = "", ...props }: ToastProps) {
  return (
    <div role="status" {...props} className={`fluid-toast ${className}`.trim()}>
      {children}
    </div>
  );
}
