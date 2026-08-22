import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { fieldRadius } from "@/components/ui/input";
import { cn } from "@/lib/cn";

export const tableWrapVariants = cva(
  "min-w-0 overflow-x-auto border-md border-border",
  {
    variants: {
      radius: fieldRadius,
    },
    defaultVariants: {
      radius: "md",
    },
  },
);

export const tableVariants = cva("w-full min-w-0 text-start text-sm");

export const tableHeaderVariants = cva(
  "bg-panel-hover text-panel-foreground",
);

export const tableBodyVariants = cva(
  "[&>tr:nth-child(odd)]:bg-background [&>tr:nth-child(odd)]:text-foreground [&>tr:nth-child(even)]:bg-panel [&>tr:nth-child(even)]:text-panel-foreground [&>tr]:border-t [&>tr]:border-md [&>tr]:border-border",
);

export const tableRowVariants = cva("");

export const tableHeadVariants = cva(
  "px-3 py-2 text-start font-medium text-inherit",
);

export const tableCellVariants = cva("px-3 py-2 text-start text-inherit");

export type TableProps = HTMLAttributes<HTMLTableElement> &
  VariantProps<typeof tableVariants> &
  VariantProps<typeof tableWrapVariants>;

export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement> &
  VariantProps<typeof tableHeaderVariants>;

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement> &
  VariantProps<typeof tableBodyVariants>;

export type TableRowProps = HTMLAttributes<HTMLTableRowElement> &
  VariantProps<typeof tableRowVariants>;

export type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement> &
  VariantProps<typeof tableHeadVariants>;

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement> &
  VariantProps<typeof tableCellVariants>;

export function Table({ className, radius, ...props }: TableProps) {
  return (
    <div className={tableWrapVariants({ radius })}>
      <table className={cn(tableVariants(), className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead className={cn(tableHeaderVariants(), className)} {...props} />
  );
}

export function TableBody({ className, ...props }: TableBodyProps) {
  return <tbody className={cn(tableBodyVariants(), className)} {...props} />;
}

export function TableRow({ className, ...props }: TableRowProps) {
  return <tr className={cn(tableRowVariants(), className)} {...props} />;
}

export function TableHead({ className, scope = "col", ...props }: TableHeadProps) {
  return (
    <th
      scope={scope}
      className={cn(tableHeadVariants(), className)}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: TableCellProps) {
  return <td className={cn(tableCellVariants(), className)} {...props} />;
}
