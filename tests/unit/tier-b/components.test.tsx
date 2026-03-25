// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { join } from "node:path";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import * as fluid from "../../../packages/fluid-react/src";

const tierBComponentNames = [
  "Tabs",
  "Accordion",
  "Tooltip",
  "Popover",
  "DropdownMenu",
  "Toast",
  "Badge",
  "Avatar",
  "Pagination",
  "Breadcrumb"
] as const;

describe("Tier B components", () => {
  it("exports Tier B components from root entrypoint", () => {
    for (const name of tierBComponentNames) {
      expect(fluid).toHaveProperty(name);
    }
  });

  it("Tabs supports baseline interaction", async () => {
    const Tabs = (fluid as Record<string, any>).Tabs;
    render(
      <Tabs
        defaultValue="account"
        items={[
          { value: "account", label: "Account", content: "Account Panel" },
          { value: "security", label: "Security", content: "Security Panel" }
        ]}
      />
    );

    expect(screen.getByText("Account Panel")).toBeTruthy();
    await userEvent.click(screen.getByRole("tab", { name: "Security" }));
    expect(screen.getByText("Security Panel")).toBeTruthy();
  });

  it("Accordion toggles panel visibility", async () => {
    const Accordion = (fluid as Record<string, any>).Accordion;
    render(<Accordion items={[{ id: "a1", title: "Section A", content: "A body" }]} />);

    expect(screen.queryByText("A body")).toBeNull();
    await userEvent.click(screen.getByRole("button", { name: "Section A" }));
    expect(screen.getByText("A body")).toBeTruthy();
  });

  it("DropdownMenu is folded by default and expands on trigger click", async () => {
    const DropdownMenu = (fluid as Record<string, any>).DropdownMenu;
    const onSelect = vi.fn();

    render(
      <DropdownMenu
        triggerLabel="Actions"
        items={[
          { label: "Edit", value: "edit" },
          { label: "Delete", value: "delete" }
        ]}
        onSelect={onSelect}
      />
    );

    expect(screen.queryByRole("menuitem", { name: "Edit" })).toBeNull();
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    await screen.findByRole("menuitem", { name: "Edit" });
    await userEvent.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(onSelect).toHaveBeenCalledWith("edit");
    expect(screen.queryByRole("menuitem", { name: "Delete" })).toBeNull();
  });

  it("has Tier B maturity metadata entries", () => {
    const maturityPath = join(process.cwd(), "apps/docs/content/maturity.json");
    const maturity = JSON.parse(readFileSync(maturityPath, "utf8")) as Record<string, string>;

    for (const name of tierBComponentNames) {
      expect(maturity[name]).toBe("B");
    }
  });
});
