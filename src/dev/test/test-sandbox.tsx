"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { List } from "@/components/ui/list";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
import { copy } from "@/dev/copy";
import { labHatchClass } from "@/dev/gallery/shared";
import { cn } from "@/lib/cn";

/**
 * Edit this file freely. Product code must not import it.
 * When a experiment looks right, ask the agent to move it into the real component.
 */
export function TestSandbox() {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const [hatch, setHatch] = useState(true);

  return (
    <article className="flex min-w-0 flex-col gap-8">
      <header className="flex min-w-0 flex-col gap-3">
        <Heading level={1}>{copy.testPage.title}</Heading>
        <Text variant="muted">{copy.testPage.intro}</Text>
        <List as="ol" marker="decimal" className="text-foreground/70">
          {copy.testPage.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </List>
      </header>

      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <Tooltip content={copy.dirToggle} side="bottom">
          <Button
            type="button"
            variant="soft"
            size="sm"
            onClick={() =>
              setDir((current) => (current === "ltr" ? "rtl" : "ltr"))
            }
            aria-label={copy.dirToggle}
            aria-pressed={dir === "rtl"}
          >
            {dir === "rtl" ? copy.dirRtl : copy.dirLtr}
          </Button>
        </Tooltip>
        <Tooltip content={copy.hatchToggle} side="bottom">
          <Switch
            checked={hatch}
            onCheckedChange={setHatch}
            size="sm"
            aria-label={copy.hatchToggle}
          />
        </Tooltip>
      </div>

      <div
        dir={dir}
        className={cn(
          "min-h-96 min-w-0 overflow-auto rounded-md border-md border-border p-6",
          hatch ? labHatchClass : "bg-background",
        )}
      >
        {/* ——— Add experiments below. Duplicate TestSection blocks as needed. ——— */}

        <Card
          border="md"
          borderLightTop="primary"
          borderLightTopStart={10}
          borderLightTopCenter={50}
          borderLightTopEnd={90}
          borderLightBottom="accent-2"
          borderLightBottomStart={0}
          borderLightBottomCenter={20}
          borderLightBottomEnd={40}
          className="h-[350px] w-[250px]"
          surface="glass"
          lightBottom="primary"
          lightTop="foreground"
        />

        {/* ——— End of experiments. ——— */}
      </div>
    </article>
  );
}
