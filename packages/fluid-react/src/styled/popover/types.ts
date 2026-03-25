import type { HTMLAttributes, ReactNode } from "react";

export type PopoverProps = HTMLAttributes<HTMLDivElement> & {
  trigger: ReactNode;
  content: ReactNode;
};
