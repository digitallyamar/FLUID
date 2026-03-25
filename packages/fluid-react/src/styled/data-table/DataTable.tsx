import React from "react";
import type { DataTableProps } from "./types.js";

export function DataTable({ columns, rows, ...props }: DataTableProps) {
  return (
    <table {...props}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} scope="col">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={`${row.id}-${column.key}`}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
