import React from "react";
import type { PaginationProps } from "./types.js";

export function Pagination({ page, totalPages, onPageChange, className = "", ...props }: PaginationProps) {
  return (
    <nav aria-label="pagination" {...props} className={`fluid-pagination ${className}`.trim()}>
      <button className="fluid-pagination-button" type="button" onClick={() => onPageChange?.(Math.max(1, page - 1))}>
        Previous
      </button>
      <span className="fluid-pagination-status">
        {page} / {totalPages}
      </span>
      <button className="fluid-pagination-button" type="button" onClick={() => onPageChange?.(Math.min(totalPages, page + 1))}>
        Next
      </button>
    </nav>
  );
}
