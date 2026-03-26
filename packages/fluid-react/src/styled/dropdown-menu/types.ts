import type { HTMLAttributes } from "react";

export type DropdownMenuItem = {
  label: string;
  value: string;
};

export type DropdownMenuProps = HTMLAttributes<HTMLDivElement> & {
  items: DropdownMenuItem[];
  triggerLabel?: string;
  onSelect?: (value: string) => void;
};
