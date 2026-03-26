import { describe, expect, it } from "vitest";
import pkg from "../../package.json";

describe("workspace metadata", () => {
  it("locks React 19 and TypeScript 5.6 ranges", () => {
    expect(pkg.devDependencies.react).toBe("^19.0.0");
    expect(pkg.devDependencies.typescript).toBe("^5.6.0");
  });
});
