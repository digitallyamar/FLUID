import type { HTMLAttributes } from "react";

export type PaginationProps = HTMLAttributes<HTMLElement> & {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
};
