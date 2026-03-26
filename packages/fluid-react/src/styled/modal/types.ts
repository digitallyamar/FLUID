import type { HTMLAttributes } from "react";

export type ModalProps = HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  title: string;
};
