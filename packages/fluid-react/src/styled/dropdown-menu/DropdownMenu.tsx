import React from "react";
import type { DropdownMenuProps } from "./types.js";

export function DropdownMenu({ items, onSelect, ...props }: DropdownMenuProps) {
  return (
    <div {...props}>
      {items.map((item) => (
        <button key={item.value} type="button" onClick={() => onSelect?.(item.value)}>
          {item.label}
        </button>
      ))}
    </div>
  );
}
