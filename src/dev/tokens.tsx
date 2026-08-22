import { Heading } from "@/components/ui/heading";
import { List } from "@/components/ui/list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { copy } from "@/dev/copy";
import { fontFaceCatalog, fontFaceLabels, fontFaceValues, type FontFace } from "@/fonts";
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

const primarySwatch = {
  name: "primary",
  tones: [
    { label: "base", className: "bg-primary" },
    { label: "foreground", className: "bg-primary-foreground" },
    { label: "hover", className: "bg-primary-hover" },
    { label: "glow", className: "bg-primary-glow" },
    { label: "shadow", className: "bg-primary-shadow" },
  ],
} as const;

const actionSwatches = [
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
  { label: "none", className: "rounded-none" },
  { label: "xs", className: "rounded-xs" },
  { label: "sm", className: "rounded-sm" },
  { label: "md", className: "rounded-md" },
  { label: "lg", className: "rounded-lg" },
  { label: "xl", className: "rounded-xl" },
  { label: "full", className: "rounded-full" },
] as const;

const borderSwatches = [
  { label: "none", className: "border-none", note: "0" },
  { label: "sm", className: "border-sm", note: "1px" },
  { label: "md", className: "border-md", note: "2px" },
  { label: "lg", className: "border-lg", note: "3px" },
] as const;

const layoutRows = [
  { name: "xs", className: "max-w-container-xs" },
  { name: "sm", className: "max-w-container-sm" },
  { name: "md", className: "max-w-container-md" },
  { name: "lg", className: "max-w-container-lg" },
  { name: "xl", className: "max-w-container-xl" },
  { name: "full", className: "max-w-none" },
] as const satisfies ReadonlyArray<{
  name: keyof ThemeContainer;
  className: string;
}>;

const typeScaleRows = [
  { name: "h1", sample: "text-h1 md:text-h1-md", note: "3rem → 100px · lh 110%" },
  { name: "h2", sample: "text-h2 md:text-h2-md", note: "2.25rem → 72px · lh 110%" },
  { name: "h3", sample: "text-h3 md:text-h3-md", note: "1.75rem → 48px · lh 110%" },
  { name: "h4", sample: "text-h4 md:text-h4-md", note: "1.5rem → 36px · lh 110%" },
  { name: "h5", sample: "text-h5 md:text-h5-md", note: "1.25rem → 28px · lh 110%" },
  { name: "h6", sample: "text-h6 md:text-h6-md", note: "1.125rem → 24px · lh 110%" },
  { name: "body", sample: "text-body tracking-body", note: "16px · lh 24px · tracking 0.03em" },
  { name: "label", sample: "text-label", note: "20px · lh 100% · Label lg" },
  { name: "label-md", sample: "text-label-md", note: "16px · lh 100% · Label md default" },
  { name: "label-sm", sample: "text-label-sm", note: "14px · lh 100% · Label sm" },
] as const;

const tokenSwatch = "size-20";

function Swatch({ label, className }: { label: string; className: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <div
        className={`shrink-0 border-md border-border ${tokenSwatch} ${className}`}
      />
      <Text as="span" variant="caption" className="min-w-0 truncate">
        {label}
      </Text>
    </div>
  );
}

export async function TokenGallery() {
  const settings = await getSettings();

  return (
    <Tabs defaultValue="layout">
      <TabsList>
        <TabsTrigger value="layout">{copy.tokensPage.layoutTab}</TabsTrigger>
        <TabsTrigger value="type">{copy.tokensPage.typeTab}</TabsTrigger>
        <TabsTrigger value="color">{copy.tokensPage.colorTab}</TabsTrigger>
        <TabsTrigger value="radius">{copy.tokensPage.radiusTab}</TabsTrigger>
        <TabsTrigger value="border">{copy.tokensPage.borderTab}</TabsTrigger>
      </TabsList>
      <TabsContent value="layout" className="flex min-w-0 flex-col gap-2">
        <Heading level={3} tone="muted">
          layout
        </Heading>
        <Text variant="caption">{copy.tokensPage.layoutIntro}</Text>
        <List marker="none" gap="sm">
          {layoutRows.map((row) => (
            <li key={row.name} className="flex min-w-0 flex-col gap-1">
              <Text as="span" variant="caption">
                {row.name}: {settings.theme.container[row.name]}
              </Text>
              <div
                className={`h-2 w-full bg-panel ${row.className} shadow-outline`}
              />
            </li>
          ))}
        </List>
      </TabsContent>
      <TabsContent value="type" className="flex min-w-0 flex-col gap-8">
        <Text variant="caption">{copy.tokensPage.typeIntro}</Text>
        <div className="flex min-w-0 flex-col gap-4">
          <Heading level={3} tone="muted">
            faces
          </Heading>
          <List marker="none" gap="sm">
            {fontFaceValues.map((key) => (
              <li key={key} className="flex min-w-0 flex-col gap-1">
                <Text as="span" variant="caption">
                  {key} · {fontFaceLabels[key]} · weight{" "}
                  {fontFaceCatalog[key].weight}
                </Text>
                <Text font={key as FontFace}>{fontFaceLabels[key]}</Text>
              </li>
            ))}
          </List>
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <Heading level={3} tone="muted">
            type scale
          </Heading>
          <List marker="none" gap="sm">
            {typeScaleRows.map((row) => (
              <li key={row.name} className="flex min-w-0 flex-col gap-1">
                <Text as="span" variant="caption">
                  {row.name}: {row.note}
                </Text>
                <p className={`min-w-0 text-start text-foreground ${row.sample}`}>
                  {row.name}
                </p>
              </li>
            ))}
          </List>
        </div>
      </TabsContent>
      <TabsContent value="color" className="flex min-w-0 flex-col gap-8">
        <div className="flex min-w-0 flex-col gap-2">
          <Heading level={3} tone="muted">
            {primarySwatch.name}
          </Heading>
          <div className="flex min-w-0 flex-wrap gap-3">
            {primarySwatch.tones.map((tone) => (
              <Swatch key={tone.label} {...tone} />
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <Heading level={3} tone="muted">
            surface
          </Heading>
          <div className="flex min-w-0 flex-wrap gap-3">
            {surfaceSwatches.map((swatch) => (
              <Swatch key={swatch.label} {...swatch} />
            ))}
          </div>
        </div>
        {actionSwatches.map((action) => (
          <div key={action.name} className="flex min-w-0 flex-col gap-2">
            <Heading level={3} tone="muted">
              {action.name}
            </Heading>
            <div className="flex min-w-0 flex-wrap gap-3">
              {action.tones.map((tone) => (
                <Swatch key={tone.label} {...tone} />
              ))}
            </div>
          </div>
        ))}
      </TabsContent>
      <TabsContent value="radius" className="flex min-w-0 flex-col gap-2">
        <Heading level={3} tone="muted">
          radius
        </Heading>
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          {radiusSwatches.map((swatch) => (
            <div key={swatch.label} className="flex min-w-0 flex-col items-center gap-1">
              <div
                className={`bg-panel ${tokenSwatch} ${swatch.className} shadow-outline`}
              />
              <Text as="span" variant="caption">
                {swatch.label}
              </Text>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="border" className="flex min-w-0 flex-col gap-2">
        <Heading level={3} tone="muted">
          border
        </Heading>
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          {borderSwatches.map((swatch) => (
            <div key={swatch.label} className="flex min-w-0 flex-col items-center gap-1">
              <div
                className={`border bg-panel border-border ${tokenSwatch} ${swatch.className}`}
              />
              <Text as="span" variant="caption">
                {swatch.label} · {swatch.note}
              </Text>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
