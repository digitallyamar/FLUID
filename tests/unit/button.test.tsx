// @vitest-environment jsdom
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../packages/fluid-react/src";

describe("Button", () => {
  it("fires click and supports keyboard activation", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    await userEvent.click(button);
    button.focus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("forwards native props", () => {
    render(
      <Button aria-label="save-btn" data-testid="save-btn">
        Save
      </Button>
    );
    expect(screen.getByTestId("save-btn").getAttribute("aria-label")).toBe("save-btn");
  });
});
