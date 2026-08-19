"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
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

export const sideMenuPanelVariants = cva(
  "fixed inset-y-0 z-50 h-dvh w-80 max-w-full min-w-0 transition-transform duration-300 motion-reduce:transition-none",
  {
    variants: {
      side: {
        start: "start-0",
        end: "end-0",
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

type SideMenuContextValue = {
  close: () => void;
  closeLabel: string;
  titleId: string;
  closeId: string;
};

const SideMenuContext = createContext<SideMenuContextValue | null>(null);

function useSideMenu() {
  const value = useContext(SideMenuContext);

  if (!value) {
    throw new Error("SideMenu slots must be used inside SideMenu.");
  }

  return value;
}

export type SideMenuVariant =
  | "filled"
  | "secondary"
  | "outline"
  | "soft"
  | "link"
  | "muted";

export type SideMenuProps = {
  trigger?: ReactNode;
  icon?: IconName;
  children: ReactNode;
  label: string;
  closeLabel: string;
  variant?: SideMenuVariant;
  color?: ButtonColor;
  side?: VariantProps<typeof sideMenuPanelVariants>["side"];
  className?: string;
};

export type SideMenuHeaderProps = CardHeaderProps;
export type SideMenuContentProps = CardContentProps;
export type SideMenuFooterProps = CardFooterProps;

export function SideMenuHeader({
  className,
  children,
  variant = "border",
  ...props
}: SideMenuHeaderProps) {
  const { close, closeLabel, titleId, closeId } = useSideMenu();

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

export function SideMenuContent({
  className,
  onClick,
  ...props
}: SideMenuContentProps) {
  const { close } = useSideMenu();

  return (
    <CardContent
      className={cn("overflow-y-auto", className)}
      onClick={(event) => {
        onClick?.(event);
        close();
      }}
      {...props}
    />
  );
}

export function SideMenuFooter({
  className,
  variant = "border",
  onClick,
  ...props
}: SideMenuFooterProps) {
  const { close } = useSideMenu();

  return (
    <CardFooter
      variant={variant}
      className={cn("w-full", className)}
      onClick={(event) => {
        onClick?.(event);
        close();
      }}
      {...props}
    />
  );
}

export function SideMenu({
  trigger,
  icon,
  children,
  label,
  closeLabel,
  variant = "outline",
  color = "primary",
  side = "end",
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
                  "fixed inset-0 z-50 bg-background/72 backdrop-blur-xs transition-opacity duration-300 motion-reduce:transition-none",
                  open ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                onClick={() => setOpen(false)}
              />
              <Card
                id={panelId}
                role="dialog"
                aria-modal={open}
                aria-labelledby={titleId}
                aria-hidden={!open}
                inert={!open}
                padding="none"
                radius="none"
                surface="glass"
                lightBottom="primary"
                lightTop="foreground"
                className={cn(
                  sideMenuPanelVariants({ side: resolvedSide }),
                  open ? "translate-x-0" : closedTranslate[resolvedSide],
                )}
              >
                <SideMenuContext.Provider
                  value={{
                    close: () => setOpen(false),
                    closeLabel,
                    titleId,
                    closeId,
                  }}
                >
                  {children}
                </SideMenuContext.Provider>
              </Card>
            </>,
            document.body,
          )
        : null}
    </div>
  );
}
