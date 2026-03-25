import React from "react";
import type { DatePickerProps } from "./types.js";

export function DatePicker({ className = "", ...props }: DatePickerProps) {
  return <input type="date" {...props} className={`fluid-date-picker ${className}`.trim()} />;
}
