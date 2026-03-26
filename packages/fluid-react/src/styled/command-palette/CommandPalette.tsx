import React from "react";
import type { CommandPaletteProps } from "./types.js";

export function CommandPalette({ items, onSelect, className = "", ...props }: CommandPaletteProps) {
  return (
    <div {...props} className={`fluid-command-palette ${className}`.trim()}>
      <input className="fluid-command-palette-search" type="search" aria-label="command-search" />
      <ul className="fluid-command-palette-list">
        {items.map((item) => (
          <li key={item.value}>
            <button className="fluid-command-palette-item" type="button" onClick={() => onSelect?.(item.value)}>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
