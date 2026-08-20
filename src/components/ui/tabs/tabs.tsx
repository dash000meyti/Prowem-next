"use client";

import {
  createContext,
  useContext,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const value = useContext(TabsContext);

  if (!value) {
    throw new Error("Tabs slots must be used inside Tabs.");
  }

  return value;
}

export type TabsProps = HTMLAttributes<HTMLDivElement> & {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
};

export type TabsListProps = HTMLAttributes<HTMLDivElement>;

export type TabsTriggerProps = {
  value: string;
  children: ReactNode;
  className?: string;
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

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={cn("flex min-w-0 flex-wrap gap-1", className)}
      {...props}
    />
  );
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const tabs = useTabs();
  const selected = tabs.value === value;

  return (
    <Button
      type="button"
      role="tab"
      aria-selected={selected}
      variant={selected ? "subtle" : "ghost"}
      size="sm"
      radius="md"
      className={className}
      onClick={() => tabs.setValue(value)}
    >
      {children}
    </Button>
  );
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
