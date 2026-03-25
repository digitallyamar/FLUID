import React from "react";
import type { TabsProps } from "./types.js";

export function Tabs({ defaultValue, items, ...props }: TabsProps) {
  const initial = defaultValue ?? items[0]?.value;
  const [active, setActive] = React.useState(initial);
  const activeItem = items.find((item) => item.value === active) ?? items[0];
  const itemValues = items.map((item) => item.value);

  const focusAndSelect = (nextValue: string) => {
    setActive(nextValue);
    const nextTab = document.getElementById(`fluid-tab-${nextValue}`);
    nextTab?.focus();
  };

  return (
    <div {...props} className={`fluid-tabs ${props.className ?? ""}`.trim()}>
      <div className="fluid-tabs-list" role="tablist" aria-label={props["aria-label"] as string | undefined}>
        {items.map((item) => (
          <button
            key={item.value}
            id={`fluid-tab-${item.value}`}
            type="button"
            role="tab"
            aria-controls={`fluid-tabpanel-${item.value}`}
            aria-selected={item.value === active}
            className={`fluid-tab ${item.value === active ? "fluid-tab-active" : ""}`.trim()}
            onClick={() => setActive(item.value)}
            onKeyDown={(event) => {
              const index = itemValues.indexOf(item.value);
              if (event.key === "ArrowRight") {
                event.preventDefault();
                const nextValue = itemValues[(index + 1) % itemValues.length];
                focusAndSelect(nextValue);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                const nextValue = itemValues[(index - 1 + itemValues.length) % itemValues.length];
                focusAndSelect(nextValue);
              }
              if (event.key === "Home") {
                event.preventDefault();
                focusAndSelect(itemValues[0]);
              }
              if (event.key === "End") {
                event.preventDefault();
                focusAndSelect(itemValues[itemValues.length - 1]);
              }
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      {activeItem ? (
        <div id={`fluid-tabpanel-${activeItem.value}`} className="fluid-tabpanel" role="tabpanel">
          {activeItem.content}
        </div>
      ) : null}
    </div>
  );
}
