import React from "react";
import type { PaginationProps } from "./types.js";

export function Pagination({ page, totalPages, onPageChange, ...props }: PaginationProps) {
  return (
    <nav aria-label="pagination" {...props}>
      <button type="button" onClick={() => onPageChange?.(Math.max(1, page - 1))}>
        Previous
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button type="button" onClick={() => onPageChange?.(Math.min(totalPages, page + 1))}>
        Next
      </button>
    </nav>
  );
}
