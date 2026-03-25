import React from "react";
import type { BreadcrumbProps } from "./types.js";

export function Breadcrumb({ items, className = "", ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" {...props} className={`fluid-breadcrumb ${className}`.trim()}>
      <ol className="fluid-breadcrumb-list">
        {items.map((item, index) => (
          <li key={`${item.label}-${item.href ?? "current"}`} className="fluid-breadcrumb-item">
            {index > 0 ? <span className="fluid-breadcrumb-separator">/</span> : null}
            {item.href ? <a href={item.href} className="fluid-breadcrumb-link">{item.label}</a> : <span className="fluid-breadcrumb-current">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
