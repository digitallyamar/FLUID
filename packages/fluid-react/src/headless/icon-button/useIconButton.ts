import type { ButtonHTMLAttributes } from "react";

export function useIconButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return {
    type: props.type ?? "button",
    disabled: props.disabled ?? false,
    onClick: props.onClick
  };
}
