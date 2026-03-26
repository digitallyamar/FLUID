import type { InputHTMLAttributes } from "react";

export function useCheckbox(props: InputHTMLAttributes<HTMLInputElement>) {
  return {
    ...props,
    type: "checkbox" as const
  };
}
