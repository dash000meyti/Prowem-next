"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import type { IconName } from "@/components/icons";
import { Button, type ButtonColor, type ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

export const dropdownPanelVariants = cva(
  "absolute top-full z-50 mt-1 min-w-48 p-1 transition-opacity duration-300 motion-reduce:transition-none",
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

export type DropdownVariant = NonNullable<ButtonProps["variant"]>;

export type DropdownProps = {
  trigger?: ReactNode;
  icon?: IconName;
  children: ReactNode;
  label: string;
  variant?: DropdownVariant;
  color?: ButtonColor;
  size?: ButtonProps["size"];
  align?: VariantProps<typeof dropdownPanelVariants>["align"];
  className?: string;
};

export function Dropdown({
  trigger,
  icon,
  children,
  label,
  variant = "soft",
  color = "primary",
  size = "md",
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
        variant={variant}
        color={color}
        size={size}
        icon={icon}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={label}
        onClick={() => setOpen((value) => !value)}
      >
        {trigger}
      </Button>
      <Card
        id={panelId}
        role="menu"
        aria-hidden={!open}
        inert={!open}
        surface="panel"
        padding="none"
        className={cn(
          dropdownPanelVariants({ align }),
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
      >
        {children}
      </Card>
    </div>
  );
}
