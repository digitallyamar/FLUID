import React from "react";
import type { DataTableProps } from "./types.js";

export function DataTable({ columns, rows, className = "", ...props }: DataTableProps) {
  return (
    <table {...props} className={`fluid-data-table ${className}`.trim()}>
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
