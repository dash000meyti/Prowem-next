"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

const subscribeIsClient = () => () => {};
const getIsClientSnapshot = () => true;
const getIsServerSnapshot = () => false;

export type TooltipSide = "top" | "bottom" | "start" | "end";

export type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  side?: TooltipSide;
  className?: string;
};

type Coords = {
  top: number;
  left: number;
  dir: "ltr" | "rtl";
};

function readCoords(node: HTMLElement, side: TooltipSide): Coords {
  const rect = node.getBoundingClientRect();
  const dir =
    (node.closest("[dir]")?.getAttribute("dir") ||
      document.documentElement.dir) === "rtl"
      ? "rtl"
      : "ltr";

  if (side === "top" || side === "bottom") {
    return {
      top: side === "top" ? rect.top : rect.bottom,
      left: rect.left + rect.width / 2,
      dir,
    };
  }

  const towardStart = side === "start";
  const flip = dir === "rtl";

  return {
    top: rect.top + rect.height / 2,
    left: towardStart !== flip ? rect.left : rect.right,
    dir,
  };
}

function transformForSide(side: TooltipSide, dir: "ltr" | "rtl"): string {
  if (side === "top") {
    return "translate(-50%, calc(-100% - 0.5rem))";
  }
  if (side === "bottom") {
    return "translate(-50%, 0.5rem)";
  }

  const towardStart = side === "start";
  const flip = dir === "rtl";
  const toNegative = towardStart !== flip;

  return toNegative
    ? "translate(calc(-100% - 0.5rem), -50%)"
    : "translate(0.5rem, -50%)";
}

export function Tooltip({
  content,
  children,
  side = "top",
  className,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const delayRef = useRef<number | undefined>(undefined);
  const panelId = useId();
  const [coords, setCoords] = useState<Coords>({
    top: 0,
    left: 0,
    dir: "ltr",
  });
  const mounted = useSyncExternalStore(
    subscribeIsClient,
    getIsClientSnapshot,
    getIsServerSnapshot,
  );

  function updatePosition() {
    const node = triggerRef.current;
    if (!node) {
      return;
    }

    setCoords(readCoords(node, side));
  }

  function show() {
    window.clearTimeout(delayRef.current);
    delayRef.current = window.setTimeout(() => {
      updatePosition();
      setOpen(true);
    }, 200);
  }

  function hide() {
    window.clearTimeout(delayRef.current);
    setOpen(false);
  }

  useEffect(() => {
    return () => window.clearTimeout(delayRef.current);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onScroll() {
      const node = triggerRef.current;
      if (!node) {
        return;
      }

      setCoords(readCoords(node, side));
    }

    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, side]);

  const style: CSSProperties = {
    top: coords.top,
    left: coords.left,
    transform: transformForSide(side, coords.dir),
  };

  return (
    <span
      ref={triggerRef}
      className="inline-flex max-w-full"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocusCapture={show}
      onBlurCapture={hide}
    >
      {children}
      {mounted && open
        ? createPortal(
            <Card
              id={panelId}
              role="tooltip"
              padding="sm"
              className={cn(
                "pointer-events-none fixed z-50 max-w-xs text-xs",
                className,
              )}
              style={style}
            >
              {content}
            </Card>,
            document.body,
          )
        : null}
    </span>
  );
}
