import type { ButtonHTMLAttributes } from "react";

export function useButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return {
    type: props.type ?? "button",
    disabled: props.disabled ?? false,
    onClick: props.onClick
  };
}
