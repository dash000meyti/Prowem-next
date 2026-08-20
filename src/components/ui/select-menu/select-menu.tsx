"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { VariantProps } from "class-variance-authority";
import { Icon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { dropdownPanelVariants } from "@/components/ui/dropdown";
import { selectVariants } from "@/components/ui/select";
import { cn } from "@/lib/cn";

export type SelectMenuItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

const chevronEnd = {
  sm: "end-2",
  md: "end-2 md:end-3",
  lg: "end-3 md:end-4",
} as const;

export const selectMenuTriggerVariants = selectVariants;

export type SelectMenuProps = {
  items: readonly SelectMenuItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label: string;
  disabled?: boolean;
  size?: VariantProps<typeof selectVariants>["size"];
  radius?: VariantProps<typeof selectVariants>["radius"];
  align?: VariantProps<typeof dropdownPanelVariants>["align"];
  className?: string;
};

function enabledIndexes(items: readonly SelectMenuItem[]) {
  return items.flatMap((item, index) => (item.disabled ? [] : [index]));
}

function nextEnabled(
  items: readonly SelectMenuItem[],
  from: number,
  delta: number,
) {
  const enabled = enabledIndexes(items);
  if (enabled.length === 0) {
    return -1;
  }

  const current = enabled.indexOf(from);
  const start = current === -1 ? (delta > 0 ? -1 : enabled.length) : current;
  const next = enabled[(start + delta + enabled.length) % enabled.length];
  return next ?? enabled[0] ?? -1;
}

export function SelectMenu({
  items,
  value,
  defaultValue = "",
  onValueChange,
  placeholder,
  label,
  disabled = false,
  size = "md",
  radius,
  align = "start",
  className,
}: SelectMenuProps) {
  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const selected = isControlled ? value : uncontrolled;
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const optionId = useId();
  const resolvedSize = size ?? "md";
  const selectedItem = items.find((item) => item.value === selected);
  const display = selectedItem?.label ?? placeholder ?? "";

  function commit(next: string) {
    if (!isControlled) {
      setUncontrolled(next);
    }
    onValueChange?.(next);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function highlightFromSelection() {
    const selectedIndex = items.findIndex((item) => item.value === selected);
    return selectedIndex >= 0 && !items[selectedIndex]?.disabled
      ? selectedIndex
      : (enabledIndexes(items)[0] ?? -1);
  }

  function setMenuOpen(next: boolean) {
    if (next) {
      setHighlighted(highlightFromSelection());
    }
    setOpen(next);
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    queueMicrotask(() => listRef.current?.focus());

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open || highlighted < 0) {
      return;
    }

    const node = listRef.current?.querySelector(`[data-index="${highlighted}"]`);
    if (node instanceof HTMLElement) {
      node.scrollIntoView({ block: "nearest" });
    }
  }, [highlighted, open]);

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) {
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setMenuOpen(true);
      return;
    }

    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  }

  function onListKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      setMenuOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlighted((current) => nextEnabled(items, current, 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlighted((current) => nextEnabled(items, current, -1));
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setHighlighted(enabledIndexes(items)[0] ?? -1);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      const enabled = enabledIndexes(items);
      setHighlighted(enabled[enabled.length - 1] ?? -1);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const item = items[highlighted];
      if (item && !item.disabled) {
        commit(item.value);
      }
    }
  }

  return (
    <div ref={rootRef} className={cn("relative w-full min-w-0", className)}>
      <span className="relative block w-full min-w-0">
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={label}
          className={cn(
            selectMenuTriggerVariants({ size, radius }),
            "flex items-center text-start",
            !selectedItem && "text-panel-foreground/70",
          )}
          onClick={() => {
            if (!disabled) {
              setMenuOpen(!open);
            }
          }}
          onKeyDown={onTriggerKeyDown}
        >
          <span className="min-w-0 flex-1 truncate">{display}</span>
        </button>
        <Icon
          name={open ? "chevron-up" : "chevron-down"}
          className={cn(
            "pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-panel-foreground",
            chevronEnd[resolvedSize],
            disabled && "opacity-50",
          )}
        />
      </span>
      <Card
        aria-hidden={!open}
        inert={!open}
        surface="panel"
        padding="none"
        className={cn(
          dropdownPanelVariants({ align }),
          "w-full min-w-0 p-0",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div
          id={listId}
          ref={listRef}
          role="listbox"
          tabIndex={open ? 0 : -1}
          aria-label={label}
          aria-activedescendant={
            highlighted >= 0 ? `${optionId}-${highlighted}` : undefined
          }
          className="max-h-60 overflow-y-auto p-1 outline-none"
          onKeyDown={onListKeyDown}
        >
          {items.map((item, index) => {
            const isSelected = item.value === selected;
            const isActive = index === highlighted;

            return (
              <button
                key={item.value}
                id={`${optionId}-${index}`}
                type="button"
                role="option"
                data-index={index}
                tabIndex={-1}
                disabled={item.disabled}
                aria-selected={isSelected}
                className={cn(
                  buttonVariants({
                    variant: isSelected ? "subtle" : "ghost",
                    size: "sm",
                    radius: "md",
                  }),
                  "w-full justify-start",
                  isActive && !isSelected && "bg-panel-hover/50",
                )}
                onMouseEnter={() => {
                  if (!item.disabled) {
                    setHighlighted(index);
                  }
                }}
                onClick={() => {
                  if (!item.disabled) {
                    commit(item.value);
                  }
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export { dropdownPanelVariants as selectMenuPanelVariants };
