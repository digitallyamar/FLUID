// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { createThemeProfileStore } from "../../apps/docs/src/theme/profileStore";

describe("theme profile persistence schema", () => {
  it("loads persisted profile when schema is valid", () => {
    const store = createThemeProfileStore({
      storageKey: "theme-test",
      storage: window.localStorage
    });
    window.localStorage.setItem(
      "theme-test",
      JSON.stringify({
        version: 1,
        profileId: "forest",
        colorOverrides: { primary: "#16a34a" }
      })
    );

    const state = store.load();
    expect(state).toEqual({
      version: 1,
      profileId: "forest",
      colorOverrides: { primary: "#16a34a" }
    });
  });

  it("returns null for invalid persisted schema", () => {
    const store = createThemeProfileStore({
      storageKey: "theme-test-invalid",
      storage: window.localStorage
    });
    window.localStorage.setItem(
      "theme-test-invalid",
      JSON.stringify({
        version: 2,
        profileId: 42
      })
    );

    expect(store.load()).toBeNull();
  });
});
