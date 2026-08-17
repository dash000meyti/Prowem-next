import type { Settings } from "@/settings/types";

/** Current storage adapter. Swap this function to load from SQLite later. */
async function loadSettingsFromJson(): Promise<Settings> {
  const { default: settings } = await import("@/settings/default.json");
  return settings;
}

export async function getSettings(): Promise<Settings> {
  return loadSettingsFromJson();
}
