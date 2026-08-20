"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
        <h1 className="text-2xl font-semibold tracking-tight text-start md:text-3xl">
          {copy.testPage.title}
        </h1>
        <p className="text-sm leading-6 text-foreground/70">
          {copy.testPage.intro}
        </p>
        <ol className="flex list-decimal flex-col gap-2 ps-5 text-sm leading-6 text-foreground/70">
          {copy.testPage.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </header>

      <div className="flex min-w-0 flex-wrap items-center gap-2">
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
        <Button
          type="button"
          variant="soft"
          size="sm"
          onClick={() => setHatch((current) => !current)}
          aria-label={copy.hatchToggle}
          aria-pressed={hatch}
        >
          {copy.hatch}
        </Button>
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
