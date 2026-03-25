import React from "react";
import type { ComboboxProps } from "./types.js";

export function Combobox({ options, id, ...props }: ComboboxProps) {
  const listId = `${id ?? "fluid-combobox"}-list`;
  return (
    <>
      <input list={listId} id={id} {...props} />
      <datalist id={listId}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </datalist>
    </>
  );
}
