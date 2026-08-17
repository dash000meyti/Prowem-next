import defaultSettings from "@/settings/default.json";
import { mergeSettings } from "@/settings/merge";
import type { BreakpointName, DeepPartial, Settings } from "@/settings/types";

const breakpointNames: readonly BreakpointName[] = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
];

function isBreakpointName(value: string): value is BreakpointName {
  return (breakpointNames as readonly string[]).includes(value);
}

function parseSettings(raw: typeof defaultSettings): Settings {
  return {
    theme: raw.theme,
    header: {
      navFrom: isBreakpointName(raw.header.navFrom)
        ? raw.header.navFrom
        : "lg",
    },
  };
}

const defaults = parseSettings(defaultSettings);

/** Current storage adapter. Swap this function to load from SQLite later. */
async function loadSettingsFromJson(): Promise<DeepPartial<Settings>> {
  const { default: settings } = await import("@/settings/default.json");
  return parseSettings(settings);
}

export async function getSettings(): Promise<Settings> {
  const overlay = await loadSettingsFromJson();
  return mergeSettings(defaults, overlay);
}
