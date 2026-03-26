import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("prepush security script", () => {
  it("falls back to grep when ripgrep is unavailable", () => {
    const run = spawnSync("bash", ["scripts/security/prepush-security.sh"], {
      cwd: process.cwd(),
      encoding: "utf8",
      env: {
        ...process.env,
        FLUID_FORCE_NO_RG: "1"
      }
    });

    expect(run.status).toBe(0);
    expect(run.stdout).toContain("ripgrep unavailable; falling back to grep.");
  });
});
