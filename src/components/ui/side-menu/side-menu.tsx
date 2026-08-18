"use client";

import { useEffect, useId, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
import type { IconName } from "@/components/icons";
import { Button, type ButtonColor } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const subscribeIsClient = () => () => {};
const getIsClientSnapshot = () => true;
const getIsServerSnapshot = () => false;

export const sideMenuPanelVariants = cva(
  "fixed inset-y-0 z-50 flex w-80 max-w-full min-w-0 flex-col bg-panel transition-transform duration-300 motion-reduce:transition-none",
  {
    variants: {
      side: {
        start: "start-0 border-e border-border",
        end: "end-0 border-s border-border",
      },
    },
    defaultVariants: {
      side: "end",
    },
  },
);

const closedTranslate = {
  start: "-translate-x-full rtl:translate-x-full",
  end: "translate-x-full rtl:-translate-x-full",
} as const;

export type SideMenuVariant = "filled" | "secondary" | "outline" | "soft" | "link" | "muted";

export type SideMenuProps = {
  trigger?: ReactNode;
  icon?: IconName;
  children: ReactNode;
  label: string;
  closeLabel: string;
  variant?: SideMenuVariant;
  color?: ButtonColor;
  side?: VariantProps<typeof sideMenuPanelVariants>["side"];
  footer?: ReactNode;
  className?: string;
};

export function SideMenu({
  trigger,
  icon,
  children,
  label,
  closeLabel,
  variant = "outline",
  color = "primary",
  side = "end",
  footer,
  className,
}: SideMenuProps) {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    subscribeIsClient,
    getIsClientSnapshot,
    getIsServerSnapshot,
  );
  const panelId = useId();
  const titleId = useId();
  const closeId = useId();
  const triggerId = useId();
  const resolvedSide = side ?? "end";

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.getElementById(closeId)?.focus();
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.getElementById(triggerId)?.focus();
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeId, triggerId]);

  return (
    <div className={cn(className)}>
      <Button
        id={triggerId}
        type="button"
        variant={variant}
        color={color}
        icon={icon}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={label}
        onClick={() => setOpen((value) => !value)}
      >
        {trigger}
      </Button>
      {mounted
        ? createPortal(
            <>
              <button
                type="button"
                tabIndex={open ? 0 : -1}
                aria-label={closeLabel}
                aria-hidden={!open}
                inert={!open}
                className={cn(
                  "fixed inset-0 z-50 bg-background/72 transition-opacity duration-300 motion-reduce:transition-none",
                  open ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                onClick={() => setOpen(false)}
              />
              <div
                id={panelId}
                role="dialog"
                aria-modal={open}
                aria-labelledby={titleId}
                aria-hidden={!open}
                inert={!open}
                className={cn(
                  sideMenuPanelVariants({ side: resolvedSide }),
                  open ? "translate-x-0" : closedTranslate[resolvedSide],
                )}
              >
                <div className="flex shrink-0 items-center justify-between gap-2 px-4 py-3">
                  <p
                    id={titleId}
                    className="min-w-0 truncate text-sm font-semibold tracking-tight text-start"
                  >
                    {label}
                  </p>
                  <Button
                    id={closeId}
                    type="button"
                    variant="subtle"
                    color="foreground"
                    icon="close"
                    aria-label={closeLabel}
                    onClick={() => setOpen(false)}
                  />
                </div>
                <div
                  className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 pb-4"
                  onClick={() => setOpen(false)}
                >
                  {children}
                </div>
                {footer ? (
                  <div
                    className="shrink-0 px-4 pb-4"
                    onClick={() => setOpen(false)}
                  >
                    {footer}
                  </div>
                ) : null}
              </div>
            </>,
            document.body,
          )
        : null}
    </div>
  );
}
