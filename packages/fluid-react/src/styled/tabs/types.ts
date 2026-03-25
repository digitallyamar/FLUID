import type { HTMLAttributes } from "react";

export type TabsItem = {
  value: string;
  label: string;
  content: string;
};

export type TabsProps = HTMLAttributes<HTMLDivElement> & {
  defaultValue?: string;
  items: TabsItem[];
};
