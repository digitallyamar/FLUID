import React from "react";
import type { TabsProps } from "./types.js";

export function Tabs({ defaultValue, items, ...props }: TabsProps) {
  const initial = defaultValue ?? items[0]?.value;
  const [active, setActive] = React.useState(initial);
  const activeItem = items.find((item) => item.value === active) ?? items[0];

  return (
    <div {...props}>
      <div role="tablist" aria-label={props["aria-label"] as string | undefined}>
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={item.value === active}
            onClick={() => setActive(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {activeItem ? <div role="tabpanel">{activeItem.content}</div> : null}
    </div>
  );
}
