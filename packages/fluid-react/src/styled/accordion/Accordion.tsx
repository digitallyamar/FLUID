import React from "react";
import type { AccordionProps } from "./types.js";

export function Accordion({ items, className = "", ...props }: AccordionProps) {
  const [openId, setOpenId] = React.useState<string | null>(null);

  return (
    <div {...props} className={`fluid-accordion ${className}`.trim()}>
      {items.map((item) => {
        const expanded = openId === item.id;
        const panelId = `fluid-accordion-panel-${item.id}`;
        return (
          <div key={item.id} className="fluid-accordion-item">
            <button
              type="button"
              className={`fluid-accordion-trigger ${expanded ? "fluid-accordion-trigger-active" : ""}`.trim()}
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpenId(expanded ? null : item.id)}
            >
              {item.title}
            </button>
            {expanded ? (
              <div id={panelId} className="fluid-accordion-panel">
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
