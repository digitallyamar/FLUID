import React from "react";
import type { AccordionProps } from "./types.js";

export function Accordion({ items, ...props }: AccordionProps) {
  const [openId, setOpenId] = React.useState<string | null>(null);

  return (
    <div {...props}>
      {items.map((item) => {
        const expanded = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpenId(expanded ? null : item.id)}
            >
              {item.title}
            </button>
            {expanded ? <div>{item.content}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
