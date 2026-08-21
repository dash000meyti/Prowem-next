"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
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

function isDependencyActive(
  values: Values,
  dependsOn: string | undefined,
): boolean {
  if (!dependsOn) {
    return true;
  }

  const dependencyValue = values[dependsOn];

  if (dependencyValue === false) {
    return false;
  }

  if (dependencyValue === "" || dependencyValue === "none") {
    return false;
  }

  return true;
}

type ControlGroup = {
  label?: string;
  props: ComponentMetaProp[];
};

function groupControls(
  props: ComponentMetaProp[],
  values: Values,
): ControlGroup[] {
  const visible = props.filter(
    (prop) =>
      prop.playground !== false &&
      isDependencyActive(values, prop.dependsOn),
  );
  const groups: ControlGroup[] = [];
  const indexByKey = new Map<string, number>();

  for (const prop of visible) {
    const key = prop.group ?? "";
    const existingIndex = indexByKey.get(key);

    if (existingIndex === undefined) {
      indexByKey.set(key, groups.length);
      groups.push({ label: prop.group, props: [prop] });
      continue;
    }

    groups[existingIndex]?.props.push(prop);
  }

  return groups;
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
  const id = useId();
  const rowClass = "flex min-w-0 items-center gap-2";

  if (prop.type === "enum") {
    return (
      <div className={rowClass}>
        <Label htmlFor={id} className="shrink-0">
          {prop.name}
        </Label>
        <Select
          id={id}
          size="sm"
          className={
            prop.name === "font"
              ? "w-44 max-w-full shrink-0"
              : "w-24 max-w-full shrink-0"
          }
          value={String(value ?? "")}
          onChange={(event) => onChange(event.target.value)}
        >
          {(prop.values ?? []).map((item) => (
            <option key={item || "empty"} value={item}>
              {item || copy.none}
            </option>
          ))}
        </Select>
      </div>
    );
  }

  if (prop.type === "boolean") {
    return (
      <div className={rowClass}>
        <Label htmlFor={id} className="shrink-0">
          {prop.name}
        </Label>
        <Checkbox
          id={id}
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
        />
      </div>
    );
  }

  if (prop.type === "number") {
    return (
      <div className={rowClass}>
        <Label htmlFor={id} className="shrink-0">
          {prop.name}
        </Label>
        <Input
          id={id}
          type="number"
          size="sm"
          className="w-16 max-w-full shrink-0"
          value={Number(value ?? 0)}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </div>
    );
  }

  return (
    <div className={rowClass}>
      <Label htmlFor={id} className="shrink-0">
        {prop.name}
      </Label>
      <Input
        id={id}
        size="sm"
        className="w-24 max-w-full shrink-0"
        value={String(value ?? "")}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
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
  const controlGroups = useMemo(
    () => groupControls(meta.props, values),
    [meta.props, values],
  );

  return (
    <Card padding="none">
      <CardHeader
        variant="divider"
        className="flex-row items-center justify-between gap-3"
      >
        <Text as="span" font="heeboBold" className="text-base text-foreground">
          {copy.playground}
        </Text>
        <div className="flex min-w-0 shrink-0 items-center gap-2">
          <Tooltip content={copy.dirToggle} side="bottom">
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
          </Tooltip>
          <Tooltip content={copy.hatchToggle} side="bottom">
            <Switch
              checked={hatch}
              onCheckedChange={setHatch}
              size="sm"
              aria-label={copy.hatchToggle}
            />
          </Tooltip>
          <Tooltip content={copy.resetToggle} side="bottom">
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
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent
        padding="none"
        dir={dir}
        className={cn(
          "flex min-h-48 min-w-0 flex-col items-start justify-start overflow-auto p-6",
          hatch ? labHatchClass : "bg-background",
        )}
      >
        {render(values)}
      </CardContent>
      {controlGroups.length > 0 ? (
      <CardFooter variant="divider" className="w-full">
        <div className="flex min-w-0 w-full flex-col gap-6">
          {controlGroups.map((group) => (
            <section
              key={group.label ?? "ungrouped"}
              className="flex min-w-0 flex-col gap-3"
            >
              {group.label ? (
                <Text as="span" variant="overline">
                  {group.label}
                </Text>
              ) : null}
              <div className="flex min-w-0 w-full flex-wrap gap-x-6 gap-y-3">
                {group.props.map((prop) => (
                  <Control
                    key={prop.name}
                    prop={prop}
                    value={values[prop.name]}
                    onChange={(value) =>
                      setValues((current) => ({
                        ...current,
                        [prop.name]: value,
                      }))
                    }
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </CardFooter>
      ) : null}
    </Card>
  );
}

export type PlaygroundValues = Values;
