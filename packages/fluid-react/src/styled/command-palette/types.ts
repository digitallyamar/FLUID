import type { HTMLAttributes } from "react";

export type CommandPaletteItem = {
  value: string;
  label: string;
};

export type CommandPaletteProps = HTMLAttributes<HTMLDivElement> & {
  items: CommandPaletteItem[];
  onSelect?: (value: string) => void;
};
