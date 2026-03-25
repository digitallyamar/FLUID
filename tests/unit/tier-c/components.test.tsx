// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { join } from "node:path";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import * as fluid from "../../../packages/fluid-react/src";

const tierCComponentNames = [
  "DataTable",
  "DatePicker",
  "CommandPalette",
  "Combobox"
] as const;

describe("Tier C components", () => {
  it("exports Tier C components from root entrypoint", () => {
    for (const name of tierCComponentNames) {
      expect(fluid).toHaveProperty(name);
    }
  });

  it("DataTable renders headers and rows", () => {
    const DataTable = (fluid as Record<string, any>).DataTable;
    render(
      <DataTable
        columns={[
          { key: "name", header: "Name" },
          { key: "role", header: "Role" }
        ]}
        rows={[
          { id: "1", name: "Amar", role: "Admin" },
          { id: "2", name: "Ravi", role: "User" }
        ]}
      />
    );

    expect(screen.getByRole("columnheader", { name: "Name" })).toBeTruthy();
    expect(screen.getByText("Amar")).toBeTruthy();
    expect(screen.getByText("User")).toBeTruthy();
  });

  it("DatePicker notifies when value changes", async () => {
    const DatePicker = (fluid as Record<string, any>).DatePicker;
    const onChange = vi.fn();
    render(<DatePicker aria-label="date-picker" onChange={onChange} />);

    const input = screen.getByLabelText("date-picker");
    await userEvent.type(input, "2026-04-01");
    expect(onChange).toHaveBeenCalled();
  });

  it("has Tier C maturity metadata entries", () => {
    const maturityPath = join(process.cwd(), "apps/docs/content/maturity.json");
    const maturity = JSON.parse(readFileSync(maturityPath, "utf8")) as Record<string, string>;

    for (const name of tierCComponentNames) {
      expect(maturity[name]).toBe("C");
    }
  });
});
