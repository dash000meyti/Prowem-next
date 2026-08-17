import defaultSettings from "@/settings/default.json";
import { mergeSettings } from "@/settings/merge";
import type { DeepPartial, Settings } from "@/settings/types";

const defaults: Settings = defaultSettings;

/** Current storage adapter. Swap this function to load from SQLite later. */
async function loadSettingsFromJson(): Promise<DeepPartial<Settings>> {
  const { default: settings } = await import("@/settings/default.json");
  return settings;
}

export async function getSettings(): Promise<Settings> {
  const overlay = await loadSettingsFromJson();
  return mergeSettings(defaults, overlay);
}
