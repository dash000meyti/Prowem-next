"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { VariantProps } from "class-variance-authority";
import { Icon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { dropdownPanelVariants } from "@/components/ui/dropdown";
import { fieldChevronEnd, Input } from "@/components/ui/input";
import { selectVariants } from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/cn";

export type ComboboxItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

export const comboboxTriggerVariants = selectVariants;

export type ComboboxProps = {
  items: readonly ComboboxItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label: string;
  searchLabel: string;
  emptyLabel: string;
  disabled?: boolean;
  size?: VariantProps<typeof selectVariants>["size"];
  radius?: VariantProps<typeof selectVariants>["radius"];
  align?: VariantProps<typeof dropdownPanelVariants>["align"];
  className?: string;
};

function enabledIndexes(items: readonly ComboboxItem[]) {
  return items.flatMap((item, index) => (item.disabled ? [] : [index]));
}

function nextEnabled(
  items: readonly ComboboxItem[],
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

function filterItems(items: readonly ComboboxItem[], query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return items;
  }

  return items.filter((item) => item.label.toLowerCase().includes(needle));
}

export function Combobox({
  items,
  value,
  defaultValue = "",
  onValueChange,
  placeholder,
  label,
  searchLabel,
  emptyLabel,
  disabled = false,
  size = "md",
  radius,
  align = "start",
  className,
}: ComboboxProps) {
  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const selected = isControlled ? value : uncontrolled;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const optionId = useId();
  const resolvedSize = size ?? "md";
  const selectedItem = items.find((item) => item.value === selected);
  const display = selectedItem?.label ?? placeholder ?? "";
  const visible = useMemo(() => filterItems(items, query), [items, query]);

  function commit(next: string) {
    if (!isControlled) {
      setUncontrolled(next);
    }
    onValueChange?.(next);
    setQuery("");
    setOpen(false);
    triggerRef.current?.focus();
  }

  function highlightForVisible(
    visibleItems: readonly ComboboxItem[],
    search: string,
  ) {
    if (search.trim()) {
      return enabledIndexes(visibleItems)[0] ?? -1;
    }

    const selectedIndex = visibleItems.findIndex((item) => item.value === selected);
    return selectedIndex >= 0 && !visibleItems[selectedIndex]?.disabled
      ? selectedIndex
      : (enabledIndexes(visibleItems)[0] ?? -1);
  }

  function setMenuOpen(next: boolean) {
    if (next) {
      setQuery("");
      setHighlighted(highlightForVisible(items, ""));
    } else {
      setQuery("");
    }
    setOpen(next);
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    queueMicrotask(() => searchRef.current?.focus());

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setQuery("");
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

  function moveHighlight(delta: number) {
    setHighlighted((current) => nextEnabled(visible, current, delta));
  }

  function commitHighlighted() {
    const item = visible[highlighted];
    if (item && !item.disabled) {
      commit(item.value);
    }
  }

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

  function onSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      setMenuOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveHighlight(1);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveHighlight(-1);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      commitHighlighted();
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
      moveHighlight(1);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveHighlight(-1);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setHighlighted(enabledIndexes(visible)[0] ?? -1);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      const enabled = enabledIndexes(visible);
      setHighlighted(enabled[enabled.length - 1] ?? -1);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      commitHighlighted();
    }
  }

  const activeId = highlighted >= 0 ? `${optionId}-${highlighted}` : undefined;

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
            comboboxTriggerVariants({ size, radius }),
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
            fieldChevronEnd[resolvedSize],
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
        <div className="border-b border-border p-1">
          <Input
            ref={searchRef}
            type="text"
            size="sm"
            radius={radius}
            value={query}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label={searchLabel}
            placeholder={searchLabel}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={activeId}
            onChange={(event) => {
              const next = event.target.value;
              setQuery(next);
              setHighlighted(highlightForVisible(filterItems(items, next), next));
            }}
            onKeyDown={onSearchKeyDown}
          />
        </div>
        <div
          id={listId}
          ref={listRef}
          role="listbox"
          tabIndex={open ? 0 : -1}
          aria-label={label}
          aria-activedescendant={activeId}
          className="max-h-60 overflow-y-auto p-1 outline-none"
          onKeyDown={onListKeyDown}
        >
          {visible.length === 0 ? (
            <Text variant="muted" className="px-2 py-2">
              {emptyLabel}
            </Text>
          ) : (
            visible.map((item, index) => {
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
            })
          )}
        </div>
      </Card>
    </div>
  );
}

export { dropdownPanelVariants as comboboxPanelVariants };
