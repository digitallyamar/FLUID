// @vitest-environment jsdom
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Card,
  Checkbox,
  IconButton,
  Input,
  Modal,
  RadioGroup,
  Select,
  Switch,
  Textarea
} from "../../../packages/fluid-react/src";

describe("Tier A components", () => {
  it("IconButton fires click", async () => {
    const onClick = vi.fn();
    render(
      <IconButton aria-label="settings" onClick={onClick}>
        *
      </IconButton>
    );
    await userEvent.click(screen.getByRole("button", { name: "settings" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("Input change works", async () => {
    render(<Input aria-label="name" />);
    const input = screen.getByRole("textbox", { name: "name" });
    await userEvent.type(input, "fluid");
    expect((input as HTMLInputElement).value).toBe("fluid");
  });

  it("Textarea change works", async () => {
    render(<Textarea aria-label="description" />);
    const textarea = screen.getByRole("textbox", { name: "description" });
    await userEvent.type(textarea, "notes");
    expect((textarea as HTMLTextAreaElement).value).toBe("notes");
  });

  it("Select can choose option", async () => {
    render(
      <Select aria-label="role">
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </Select>
    );
    const select = screen.getByRole("combobox", { name: "role" });
    await userEvent.selectOptions(select, "user");
    expect((select as HTMLSelectElement).value).toBe("user");
  });

  it("Checkbox toggles", async () => {
    render(<Checkbox aria-label="accept" />);
    const checkbox = screen.getByRole("checkbox", { name: "accept" });
    await userEvent.click(checkbox);
    expect((checkbox as HTMLInputElement).checked).toBe(true);
  });

  it("RadioGroup selects one option", async () => {
    render(
      <RadioGroup
        aria-label="plan"
        name="plan"
        options={[
          { label: "Basic", value: "basic" },
          { label: "Pro", value: "pro" }
        ]}
      />
    );
    const pro = screen.getByRole("radio", { name: "Pro" });
    await userEvent.click(pro);
    expect((pro as HTMLInputElement).checked).toBe(true);
  });

  it("Switch toggles pressed state", async () => {
    render(<Switch aria-label="dark-mode" />);
    const sw = screen.getByRole("switch", { name: "dark-mode" });
    await userEvent.click(sw);
    expect(sw.getAttribute("aria-checked")).toBe("true");
  });

  it("Card renders children", () => {
    render(<Card>Card Body</Card>);
    expect(screen.getByText("Card Body")).toBeTruthy();
  });

  it("Modal renders when open", () => {
    render(<Modal open title="Confirm">Are you sure?</Modal>);
    expect(screen.getByRole("dialog", { name: "Confirm" })).toBeTruthy();
    expect(screen.getByText("Are you sure?")).toBeTruthy();
  });
});
