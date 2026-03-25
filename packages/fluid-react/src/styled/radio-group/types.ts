import type { InputHTMLAttributes } from "react";

export type RadioOption = { label: string; value: string };

export type RadioGroupProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  options: RadioOption[];
};
