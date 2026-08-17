"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export const dropdownPanelVariants = cva(
  "absolute top-full z-50 mt-1 min-w-48 rounded-lg border border-sm border-border bg-panel p-1",
  {
    variants: {
      align: {
        start: "start-0",
        end: "end-0",
      },
    },
    defaultVariants: {
      align: "end",
    },
  },
);

export type DropdownProps = {
  trigger: ReactNode;
  children: ReactNode;
  label: string;
  align?: VariantProps<typeof dropdownPanelVariants>["align"];
  className?: string;
};

export function Dropdown({
  trigger,
  children,
  label,
  align = "end",
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <Button
        type="button"
        variant="ghost"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={label}
        className="aspect-square p-0 border-sm border-border"
        onClick={() => setOpen((value) => !value)}
      >
        {trigger}
      </Button>
      {open ? (
        <div
          id={panelId}
          role="menu"
          className={dropdownPanelVariants({ align })}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
