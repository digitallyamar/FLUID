import React from "react";
import type { PaginationProps } from "./types.js";

export function Pagination({
  page,
  totalPages,
  onPageChange,
  getPageHref,
  className = "",
  ...props
}: PaginationProps) {
  const previousPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);

  return (
    <nav aria-label="pagination" {...props} className={`fluid-pagination ${className}`.trim()}>
      {getPageHref ? (
        <a className="fluid-pagination-button" href={getPageHref(previousPage)} rel="prev">
          Previous
        </a>
      ) : (
        <button className="fluid-pagination-button" type="button" onClick={() => onPageChange?.(previousPage)}>
          Previous
        </button>
      )}
      <span className="fluid-pagination-status">
        {page} / {totalPages}
      </span>
      {getPageHref ? (
        <a className="fluid-pagination-button" href={getPageHref(nextPage)} rel="next">
          Next
        </a>
      ) : (
        <button className="fluid-pagination-button" type="button" onClick={() => onPageChange?.(nextPage)}>
          Next
        </button>
      )}
    </nav>
  );
}
