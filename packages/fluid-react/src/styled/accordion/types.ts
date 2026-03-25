import type { HTMLAttributes } from "react";

export type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

export type AccordionProps = HTMLAttributes<HTMLDivElement> & {
  items: AccordionItem[];
};
