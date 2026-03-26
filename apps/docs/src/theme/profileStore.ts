type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const STORAGE_SCHEMA_VERSION = 1;
const EDITABLE_COLOR_KEYS = ["primary", "surface", "text", "muted", "theme"] as const;

export type ThemeColorOverrideKey = (typeof EDITABLE_COLOR_KEYS)[number];
export type ThemeProfileState = {
  version: typeof STORAGE_SCHEMA_VERSION;
  profileId: string;
  colorOverrides?: Partial<Record<ThemeColorOverrideKey, string>>;
};

function isHexColor(value: unknown): value is string {
  return typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value);
}

function parseThemeProfileState(input: unknown): ThemeProfileState | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const candidate = input as Record<string, unknown>;
  if (candidate.version !== STORAGE_SCHEMA_VERSION || typeof candidate.profileId !== "string") {
    return null;
  }

  const rawOverrides = candidate.colorOverrides;
  if (rawOverrides === undefined) {
    return {
      version: STORAGE_SCHEMA_VERSION,
      profileId: candidate.profileId
    };
  }

  if (!rawOverrides || typeof rawOverrides !== "object") {
    return null;
  }

  const safeOverrides: Partial<Record<ThemeColorOverrideKey, string>> = {};
  for (const key of EDITABLE_COLOR_KEYS) {
    const value = (rawOverrides as Record<string, unknown>)[key];
    if (value === undefined) {
      continue;
    }
    if (!isHexColor(value)) {
      return null;
    }
    safeOverrides[key] = value;
  }

  return {
    version: STORAGE_SCHEMA_VERSION,
    profileId: candidate.profileId,
    colorOverrides: safeOverrides
  };
}

export function createThemeProfileStore({
  storageKey,
  storage
}: {
  storageKey: string;
  storage?: StorageLike;
}) {
  const safeStorage =
    storage ?? (typeof window !== "undefined" ? window.localStorage : null);

  return {
    load(): ThemeProfileState | null {
      if (!safeStorage) {
        return null;
      }
      const raw = safeStorage.getItem(storageKey);
      if (!raw) {
        return null;
      }

      try {
        const parsed = JSON.parse(raw) as unknown;
        return parseThemeProfileState(parsed);
      } catch {
        return null;
      }
    },
    save(state: Omit<ThemeProfileState, "version">) {
      if (!safeStorage) {
        return;
      }
      const payload: ThemeProfileState = {
        version: STORAGE_SCHEMA_VERSION,
        profileId: state.profileId,
        colorOverrides: state.colorOverrides
      };
      safeStorage.setItem(storageKey, JSON.stringify(payload));
    },
    clear() {
      safeStorage?.removeItem(storageKey);
    }
  };
}
