import type { HTMLAttributes } from "react";

export type DataTableColumn = {
  key: string;
  header: string;
};

export type DataTableRow = {
  id: string;
  [key: string]: string;
};

export type DataTableProps = HTMLAttributes<HTMLTableElement> & {
  columns: DataTableColumn[];
  rows: DataTableRow[];
};
