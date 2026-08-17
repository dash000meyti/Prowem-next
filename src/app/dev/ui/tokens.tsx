import { getSettings } from "@/settings/get-settings";
import type { ThemeContainer } from "@/settings/types";

const surfaceSwatches = [
  { label: "background", className: "bg-background" },
  { label: "foreground", className: "bg-foreground" },
  { label: "border", className: "bg-border" },
  { label: "panel", className: "bg-panel" },
  { label: "panel-foreground", className: "bg-panel-foreground" },
  { label: "panel-hover", className: "bg-panel-hover" },
] as const;

const actionSwatches = [
  {
    name: "primary",
    tones: [
      { label: "base", className: "bg-primary" },
      { label: "foreground", className: "bg-primary-foreground" },
      { label: "hover", className: "bg-primary-hover" },
      { label: "glow", className: "bg-primary-glow" },
      { label: "shadow", className: "bg-primary-shadow" },
    ],
  },
  {
    name: "accent-1",
    tones: [
      { label: "base", className: "bg-accent-1" },
      { label: "foreground", className: "bg-accent-1-foreground" },
      { label: "hover", className: "bg-accent-1-hover" },
      { label: "glow", className: "bg-accent-1-glow" },
      { label: "shadow", className: "bg-accent-1-shadow" },
    ],
  },
  {
    name: "accent-2",
    tones: [
      { label: "base", className: "bg-accent-2" },
      { label: "foreground", className: "bg-accent-2-foreground" },
      { label: "hover", className: "bg-accent-2-hover" },
      { label: "glow", className: "bg-accent-2-glow" },
      { label: "shadow", className: "bg-accent-2-shadow" },
    ],
  },
  {
    name: "accent-3",
    tones: [
      { label: "base", className: "bg-accent-3" },
      { label: "foreground", className: "bg-accent-3-foreground" },
      { label: "hover", className: "bg-accent-3-hover" },
      { label: "glow", className: "bg-accent-3-glow" },
      { label: "shadow", className: "bg-accent-3-shadow" },
    ],
  },
  {
    name: "accent-4",
    tones: [
      { label: "base", className: "bg-accent-4" },
      { label: "foreground", className: "bg-accent-4-foreground" },
      { label: "hover", className: "bg-accent-4-hover" },
      { label: "glow", className: "bg-accent-4-glow" },
      { label: "shadow", className: "bg-accent-4-shadow" },
    ],
  },
  {
    name: "success",
    tones: [
      { label: "base", className: "bg-success" },
      { label: "foreground", className: "bg-success-foreground" },
      { label: "hover", className: "bg-success-hover" },
      { label: "glow", className: "bg-success-glow" },
      { label: "shadow", className: "bg-success-shadow" },
    ],
  },
  {
    name: "warning",
    tones: [
      { label: "base", className: "bg-warning" },
      { label: "foreground", className: "bg-warning-foreground" },
      { label: "hover", className: "bg-warning-hover" },
      { label: "glow", className: "bg-warning-glow" },
      { label: "shadow", className: "bg-warning-shadow" },
    ],
  },
  {
    name: "error",
    tones: [
      { label: "base", className: "bg-error" },
      { label: "foreground", className: "bg-error-foreground" },
      { label: "hover", className: "bg-error-hover" },
      { label: "glow", className: "bg-error-glow" },
      { label: "shadow", className: "bg-error-shadow" },
    ],
  },
] as const;

const radiusSwatches = [
  { label: "sm", className: "rounded-sm" },
  { label: "md", className: "rounded-md" },
  { label: "lg", className: "rounded-lg" },
  { label: "xl", className: "rounded-xl" },
  { label: "full", className: "rounded-full" },
] as const;

const layoutRows = [
  { name: "xs", prefix: "xs:", className: "max-w-container-xs" },
  { name: "sm", prefix: "sm:", className: "max-w-container-sm" },
  { name: "md", prefix: "md:", className: "max-w-container-md" },
  { name: "lg", prefix: "lg:", className: "max-w-container-lg" },
  { name: "xl", prefix: "xl:", className: "max-w-container-xl" },
  { name: "full", prefix: "—", className: "max-w-none" },
] as const satisfies ReadonlyArray<{
  name: keyof ThemeContainer;
  prefix: string;
  className: string;
}>;

function Swatch({ label, className }: { label: string; className: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <div
        className={`size-10 shrink-0 border-sm border-border ${className}`}
      />
      <span className="min-w-0 truncate text-xs text-foreground/70">{label}</span>
    </div>
  );
}

export async function TokenGallery() {
  const settings = await getSettings();

  return (
    <div className="flex min-w-0 flex-col gap-8">
      <div className="flex min-w-0 flex-col gap-2">
        <h3 className="text-sm font-medium text-foreground/70">layout</h3>
        <p className="text-xs text-foreground/70">
          Prefix widths live in globals.css. Container max-widths live in
          theme.container. Keep the pixel values the same. full is Container
          only.
        </p>
        <ul className="flex min-w-0 flex-col gap-2">
          {layoutRows.map((row) => (
            <li key={row.name} className="flex min-w-0 flex-col gap-1">
              <span className="text-xs text-foreground/70">
                {row.name} {row.prefix} {settings.theme.container[row.name]}
              </span>
              <div
                className={`h-2 w-full bg-panel ${row.className} shadow-outline`}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <h3 className="text-sm font-medium text-foreground/70">surface</h3>
        <div className="flex min-w-0 flex-wrap gap-3">
          {surfaceSwatches.map((swatch) => (
            <Swatch key={swatch.label} {...swatch} />
          ))}
        </div>
      </div>

      {actionSwatches.map((action) => (
        <div key={action.name} className="flex min-w-0 flex-col gap-2">
          <h3 className="text-sm font-medium text-foreground/70">{action.name}</h3>
          <div className="flex min-w-0 flex-wrap gap-3">
            {action.tones.map((tone) => (
              <Swatch key={tone.label} {...tone} />
            ))}
          </div>
        </div>
      ))}

      <div className="flex min-w-0 flex-col gap-2">
        <h3 className="text-sm font-medium text-foreground/70">radius</h3>
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          {radiusSwatches.map((swatch) => (
            <div key={swatch.label} className="flex min-w-0 flex-col items-center gap-1">
              <div
                className={`size-10 bg-panel ${swatch.className} shadow-outline`}
              />
              <span className="text-xs text-foreground/70">{swatch.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
