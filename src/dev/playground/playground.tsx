"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { copy } from "@/dev/copy";
import { labHatchClass } from "@/dev/gallery/shared";
import type { ComponentMeta, ComponentMetaProp } from "@/dev/meta/types";
import { cn } from "@/lib/cn";

type Values = Record<string, string | number | boolean>;
type PreviewDir = "ltr" | "rtl";

function initialValues(meta: ComponentMeta): Values {
  const values: Values = {};
  for (const prop of meta.props) {
    if (prop.playground === false) continue;
    if (prop.default !== undefined) values[prop.name] = prop.default;
  }
  return values;
}

function Control({
  prop,
  value,
  onChange,
}: {
  prop: ComponentMetaProp;
  value: string | number | boolean | undefined;
  onChange: (value: string | number | boolean) => void;
}) {
  const fieldClass =
    "h-9 rounded-md border-md border-border bg-background px-2 text-sm text-foreground";

  if (prop.type === "enum") {
    return (
      <label className="flex min-w-0 flex-col gap-1 text-sm">
        <span className="text-foreground/70">{prop.name}</span>
        <select
          className={fieldClass}
          value={String(value ?? "")}
          onChange={(event) => onChange(event.target.value)}
        >
          {(prop.values ?? []).map((item) => (
            <option key={item || "empty"} value={item}>
              {item || copy.none}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (prop.type === "boolean") {
    return (
      <label className="flex min-w-0 items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span>{prop.name}</span>
      </label>
    );
  }

  if (prop.type === "number") {
    return (
      <label className="flex min-w-0 flex-col gap-1 text-sm">
        <span className="text-foreground/70">{prop.name}</span>
        <input
          type="number"
          className={fieldClass}
          value={Number(value ?? 0)}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </label>
    );
  }

  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm">
      <span className="text-foreground/70">{prop.name}</span>
      <input
        type="text"
        className={fieldClass}
        value={String(value ?? "")}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function Playground({
  meta,
  render,
}: {
  meta: ComponentMeta;
  render: (values: Values) => ReactNode;
}) {
  const [values, setValues] = useState(() => initialValues(meta));
  const [dir, setDir] = useState<PreviewDir>("ltr");
  const [hatch, setHatch] = useState(true);
  const controls = useMemo(
    () => meta.props.filter((prop) => prop.playground !== false),
    [meta.props],
  );

  return (
    <Card padding="none">
      <CardHeader
        variant="divider"
        className="flex-row items-center justify-between gap-3"
      >
        <CardTitle>{copy.playground}</CardTitle>
        <div className="flex min-w-0 shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="soft"
            size="sm"
            onClick={() => setDir((current) => (current === "ltr" ? "rtl" : "ltr"))}
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
          <Button
            type="button"
            variant="soft"
            size="sm"
            onClick={() => {
              setValues(initialValues(meta));
              setDir("ltr");
              setHatch(true);
            }}
            aria-label={copy.resetToggle}
          >
            {copy.reset}
          </Button>
        </div>
      </CardHeader>
      <CardContent
        padding="none"
        dir={dir}
        className={cn(
          "min-h-48 min-w-0 overflow-auto p-6",
          hatch ? labHatchClass : "bg-background",
        )}
      >
        {render(values)}
      </CardContent>
      <CardFooter variant="divider" className="w-full">
        <div className="grid min-w-0 w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {controls.map((prop) => (
            <Control
              key={prop.name}
              prop={prop}
              value={values[prop.name]}
              onChange={(value) =>
                setValues((current) => ({ ...current, [prop.name]: value }))
              }
            />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

export type PlaygroundValues = Values;
