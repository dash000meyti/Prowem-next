"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  createContext,
  useContext,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Button, type ButtonColor, type ButtonProps } from "@/components/ui/button";
import {
  resolveCardBorderColor,
  type CardBorderColor,
} from "@/components/ui/card";
import { cn } from "@/lib/cn";

/** TabsList segmented mode uses p-1; outer radius = trigger radius + this inset. */
const tabsListPadding = "var(--spacing)";

const triggerRadiusVar = {
  none: "var(--theme-radius-none)",
  xs: "var(--theme-radius-xs)",
  sm: "var(--theme-radius-sm)",
  md: "var(--theme-radius-md)",
  lg: "var(--theme-radius-lg)",
  xl: "var(--theme-radius-xl)",
  full: "var(--theme-radius-full)",
} as const satisfies Record<NonNullable<ButtonProps["radius"]>, string>;

export type TabsRadius = NonNullable<ButtonProps["radius"]>;
export type TabsListVariant = "segmented" | "underline";
export type TabsUnderlineSize = "sm" | "md" | "lg";

const triggerTopRadiusClass = {
  none: "rounded-t-none rounded-b-none",
  xs: "rounded-t-xs rounded-b-none",
  sm: "rounded-t-sm rounded-b-none",
  md: "rounded-t-md rounded-b-none",
  lg: "rounded-t-lg rounded-b-none",
  xl: "rounded-t-xl rounded-b-none",
  full: "rounded-t-full rounded-b-none",
} as const satisfies Record<TabsRadius, string>;

/** Overlays the tablist bottom border (extends from the content edge into the border band). */
const tabActiveUnderlineBarBase =
  "before:pointer-events-none before:absolute before:bottom-[calc(-1*var(--theme-border-width-sm))] before:z-20 before:start-0 before:w-full before:content-['']";

const tabActiveUnderlineSizeClass = {
  sm: "before:h-[var(--theme-border-width-sm)]",
  md: "before:h-[var(--theme-border-width-md)]",
  lg: "before:h-[var(--theme-border-width-lg)]",
} as const satisfies Record<TabsUnderlineSize, string>;

const tabActiveUnderlineColorClass: Record<ButtonColor, string> = {
  background: "before:bg-background",
  foreground: "before:bg-foreground",
  primary: "before:bg-primary",
  "accent-1": "before:bg-accent-1",
  "accent-2": "before:bg-accent-2",
  "accent-3": "before:bg-accent-3",
  "accent-4": "before:bg-accent-4",
  success: "before:bg-success",
  warning: "before:bg-warning",
  error: "before:bg-error",
};

function tabActiveUnderlineClass(
  color: ButtonColor,
  underlineSize: TabsUnderlineSize,
): string {
  return cn(
    tabActiveUnderlineBarBase,
    tabActiveUnderlineSizeClass[underlineSize],
    tabActiveUnderlineColorClass[color],
  );
}

function outerTabsListTopRadiusStyle(radius: TabsRadius): Pick<
  CSSProperties,
  "borderTopLeftRadius" | "borderTopRightRadius"
> {
  if (radius === "full") {
    return {
      borderTopLeftRadius: triggerRadiusVar.full,
      borderTopRightRadius: triggerRadiusVar.full,
    };
  }

  if (radius === "none") {
    return {
      borderTopLeftRadius: tabsListPadding,
      borderTopRightRadius: tabsListPadding,
    };
  }

  const outer = `calc(${triggerRadiusVar[radius]} + ${tabsListPadding})`;
  return {
    borderTopLeftRadius: outer,
    borderTopRightRadius: outer,
  };
}

function outerTabsListRadius(radius: TabsRadius): string {
  if (radius === "full") {
    return triggerRadiusVar.full;
  }

  return `calc(${triggerRadiusVar[radius]} + ${tabsListPadding})`;
}

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
};

type TabsListContextValue = {
  color: ButtonColor;
  radius: TabsRadius;
  variant: TabsListVariant;
  underlineSize: TabsUnderlineSize;
};

const TabsContext = createContext<TabsContextValue | null>(null);
const TabsListContext = createContext<TabsListContextValue | null>(null);

function useTabs() {
  const value = useContext(TabsContext);

  if (!value) {
    throw new Error("Tabs slots must be used inside Tabs.");
  }

  return value;
}

function useTabsList() {
  const value = useContext(TabsListContext);

  if (!value) {
    throw new Error("TabsTrigger must be used inside TabsList.");
  }

  return value;
}

export const tabsListVariants = cva("flex w-full min-w-0 flex-nowrap", {
  variants: {
    variant: {
      segmented: "gap-1 p-1",
      underline: "isolate gap-1 px-1 pt-1 pb-0",
    },
    surface: {
      none: "",
      panel: "bg-panel",
    },
  },
  defaultVariants: {
    variant: "segmented",
    surface: "panel",
  },
});

export type TabsProps = HTMLAttributes<HTMLDivElement> & {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
};

export type TabsListProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof tabsListVariants> & {
    borderColor?: CardBorderColor;
    color?: ButtonColor;
    radius?: TabsRadius;
    /** Underline variant only — same scale as CardHeader underlineSize. */
    underlineSize?: TabsUnderlineSize;
  };

export type TabsTriggerProps = {
  value: string;
  children: ReactNode;
  className?: string;
  size?: ButtonProps["size"];
};

export type TabsContentProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
};

export function Tabs({
  className,
  defaultValue = "",
  value,
  onValueChange,
  children,
  ...props
}: TabsProps) {
  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const current = isControlled ? value : uncontrolled;

  function setValue(next: string) {
    if (!isControlled) {
      setUncontrolled(next);
    }
    onValueChange?.(next);
  }

  return (
    <TabsContext.Provider value={{ value: current, setValue }}>
      <div className={cn("flex min-w-0 flex-col gap-4", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  className,
  variant = "segmented",
  surface,
  borderColor = "border",
  color = "primary",
  radius = "sm",
  underlineSize = "md",
  style,
  ...props
}: TabsListProps) {
  const resolvedVariant = variant ?? "segmented";
  const resolvedSurface = surface ?? "panel";

  const listStyle =
    resolvedVariant === "segmented"
      ? ({
          borderStyle: "solid",
          borderWidth: "var(--theme-border-width-sm)",
          borderColor: resolveCardBorderColor(borderColor),
          borderRadius: outerTabsListRadius(radius),
          ...style,
        } satisfies CSSProperties)
      : ({
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          borderBottomWidth: "var(--theme-border-width-sm)",
          borderBottomStyle: "solid",
          borderBottomColor: resolveCardBorderColor(borderColor),
          ...outerTabsListTopRadiusStyle(radius),
          ...style,
        } satisfies CSSProperties);

  return (
    <TabsListContext.Provider
      value={{ color, radius, variant: resolvedVariant, underlineSize }}
    >
      <div
        role="tablist"
        className={cn(
          tabsListVariants({ variant: resolvedVariant, surface: resolvedSurface }),
          className,
        )}
        style={listStyle}
        {...props}
      />
    </TabsListContext.Provider>
  );
}

const tabsTriggerLayoutClass = "min-w-0 flex-1 basis-0 w-full";

function SegmentedTabsTrigger({
  value,
  children,
  className,
  size = "md",
}: TabsTriggerProps) {
  const tabs = useTabs();
  const list = useTabsList();
  const selected = tabs.value === value;

  return (
    <Button
      type="button"
      role="tab"
      aria-selected={selected}
      variant={selected ? "filled" : "subtle"}
      color={list.color}
      size={size}
      radius={list.radius}
      className={cn(tabsTriggerLayoutClass, className)}
      onClick={() => tabs.setValue(value)}
    >
      {children}
    </Button>
  );
}

function UnderlineTabsTrigger({
  value,
  children,
  className,
  size = "md",
}: TabsTriggerProps) {
  const tabs = useTabs();
  const list = useTabsList();
  const selected = tabs.value === value;

  return (
    <span
      className={cn(
        "relative flex min-w-0 flex-1 basis-0 self-stretch",
        selected && "z-[1]",
        selected && tabActiveUnderlineClass(list.color, list.underlineSize),
      )}
    >
      <Button
        type="button"
        role="tab"
        aria-selected={selected}
        variant={selected ? "ghost" : "subtle"}
        color={list.color}
        size={size}
        radius="none"
        className={cn(
          tabsTriggerLayoutClass,
          triggerTopRadiusClass[list.radius],
          "shadow-none",
          className,
        )}
        onClick={() => tabs.setValue(value)}
      >
        {children}
      </Button>
    </span>
  );
}

export function TabsTrigger(props: TabsTriggerProps) {
  const list = useTabsList();

  if (list.variant === "underline") {
    return <UnderlineTabsTrigger {...props} />;
  }

  return <SegmentedTabsTrigger {...props} />;
}

export function TabsContent({
  value,
  className,
  children,
  ...props
}: TabsContentProps) {
  const tabs = useTabs();

  if (tabs.value !== value) {
    return null;
  }

  return (
    <div role="tabpanel" className={cn("min-w-0", className)} {...props}>
      {children}
    </div>
  );
}
