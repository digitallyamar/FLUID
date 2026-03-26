import React from "react";
import { useModal } from "../../headless/modal/useModal.js";
import type { ModalProps } from "./types.js";

export function Modal({ open, title, children, className = "", ...props }: ModalProps) {
  const state = useModal(open);
  if (!state.open) {
    return null;
  }
  return (
    <div role="dialog" aria-label={title} {...props} className={`fluid-modal ${className}`.trim()}>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}
