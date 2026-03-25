import React from "react";
import type { CommandPaletteProps } from "./types.js";

export function CommandPalette({ items, onSelect, ...props }: CommandPaletteProps) {
  return (
    <div {...props}>
      <input type="search" aria-label="command-search" />
      <ul>
        {items.map((item) => (
          <li key={item.value}>
            <button type="button" onClick={() => onSelect?.(item.value)}>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
