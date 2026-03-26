import type { HTMLAttributes } from "react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbProps = HTMLAttributes<HTMLElement> & {
  items: BreadcrumbItem[];
};
