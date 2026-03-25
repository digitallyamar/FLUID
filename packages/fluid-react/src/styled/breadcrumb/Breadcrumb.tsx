import React from "react";
import type { BreadcrumbProps } from "./types.js";

export function Breadcrumb({ items, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" {...props}>
      <ol>
        {items.map((item) => (
          <li key={`${item.label}-${item.href ?? "current"}`}>
            {item.href ? <a href={item.href}>{item.label}</a> : <span>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
