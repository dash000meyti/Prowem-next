"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cva } from "class-variance-authority";
import type { IconName } from "@/components/icons";
import { Button, type ButtonColor } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  type CardContentProps,
  type CardFooterProps,
  type CardHeaderProps,
} from "@/components/ui/card";
import { cn } from "@/lib/cn";

const subscribeIsClient = () => () => {};
const getIsClientSnapshot = () => true;
const getIsServerSnapshot = () => false;

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const popupPanelVariants = cva(
  "z-50 w-full max-w-md min-w-0 transition-opacity duration-300 motion-reduce:transition-none",
);

type PopupContextValue = {
  close: () => void;
  closeLabel: string;
  titleId: string;
  closeId: string;
};

const PopupContext = createContext<PopupContextValue | null>(null);

function usePopup() {
  const value = useContext(PopupContext);

  if (!value) {
    throw new Error("Popup slots must be used inside Popup.");
  }

  return value;
}

export type PopupVariant =
  | "filled"
  | "secondary"
  | "outline"
  | "soft"
  | "link"
  | "muted";

export type PopupProps = {
  trigger?: ReactNode;
  icon?: IconName;
  children: ReactNode;
  label: string;
  closeLabel: string;
  variant?: PopupVariant;
  color?: ButtonColor;
  className?: string;
};

export type PopupHeaderProps = CardHeaderProps;
export type PopupContentProps = CardContentProps;
export type PopupFooterProps = CardFooterProps;

export function PopupHeader({
  className,
  children,
  variant = "border",
  ...props
}: PopupHeaderProps) {
  const { close, closeLabel, titleId, closeId } = usePopup();

  return (
    <CardHeader
      variant={variant}
      className={cn("flex-row items-center justify-between", className)}
      {...props}
    >
      <div
        id={titleId}
        className="min-w-0 truncate text-start text-sm font-semibold tracking-tight"
      >
        {children}
      </div>
      <Button
        id={closeId}
        type="button"
        variant="subtle"
        color="foreground"
        icon="close"
        aria-label={closeLabel}
        onClick={close}
      />
    </CardHeader>
  );
}

export function PopupContent({ className, ...props }: PopupContentProps) {
  return <CardContent className={cn("overflow-y-auto", className)} {...props} />;
}

export function PopupFooter({
  className,
  variant = "border",
  ...props
}: PopupFooterProps) {
  return (
    <CardFooter variant={variant} className={cn("w-full", className)} {...props} />
  );
}

export function Popup({
  trigger,
  icon,
  children,
  label,
  closeLabel,
  variant = "outline",
  color = "primary",
  className,
}: PopupProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(
    subscribeIsClient,
    getIsClientSnapshot,
    getIsServerSnapshot,
  );
  const panelId = useId();
  const titleId = useId();
  const closeId = useId();
  const triggerId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusable = [
        ...panelRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ].filter((node) => !node.hasAttribute("inert"));

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last?.focus();
        return;
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first?.focus();
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
                  "fixed inset-0 z-50 bg-background/72 backdrop-blur-xs transition-opacity duration-300 motion-reduce:transition-none",
                  open ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                onClick={() => setOpen(false)}
              />
              <div
                className={cn(
                  "pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4",
                  open ? "" : "hidden",
                )}
              >
                <div
                  ref={panelRef}
                  className="pointer-events-auto w-full max-w-md min-w-0"
                >
                  <Card
                    id={panelId}
                    role="dialog"
                    aria-modal={open}
                    aria-labelledby={titleId}
                    aria-hidden={!open}
                    inert={!open}
                    padding="none"
                    className={cn(
                      popupPanelVariants(),
                      open ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <PopupContext.Provider
                      value={{
                        close: () => setOpen(false),
                        closeLabel,
                        titleId,
                        closeId,
                      }}
                    >
                      {children}
                    </PopupContext.Provider>
                  </Card>
                </div>
              </div>
            </>,
            document.body,
          )
        : null}
    </div>
  );
}
