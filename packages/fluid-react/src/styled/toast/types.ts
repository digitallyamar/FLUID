import type { HTMLAttributes, ReactNode } from "react";

export type ToastProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};
