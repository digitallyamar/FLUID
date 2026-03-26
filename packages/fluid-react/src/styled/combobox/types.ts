import type { InputHTMLAttributes } from "react";

export type ComboboxOption = {
  value: string;
  label: string;
};

export type ComboboxProps = InputHTMLAttributes<HTMLInputElement> & {
  options: ComboboxOption[];
};
