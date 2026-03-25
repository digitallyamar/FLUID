import React from "react";
import type { DropdownMenuProps } from "./types.js";

export function DropdownMenu({
  items,
  onSelect,
  triggerLabel = "Menu",
  className = "",
  ...props
}: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div {...props} ref={rootRef} className={`fluid-dropdown-menu-root ${className}`.trim()}>
      <button
        type="button"
        className="fluid-dropdown-menu-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {triggerLabel}
      </button>
      {open ? (
        <div className="fluid-dropdown-menu" role="menu">
          {items.map((item) => (
            <button
              key={item.value}
              type="button"
              role="menuitem"
              className="fluid-dropdown-menu-item"
              onClick={() => {
                onSelect?.(item.value);
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
