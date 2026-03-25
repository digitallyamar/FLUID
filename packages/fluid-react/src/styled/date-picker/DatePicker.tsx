import React from "react";
import type { DatePickerProps } from "./types.js";

export function DatePicker(props: DatePickerProps) {
  return <input type="date" {...props} />;
}
