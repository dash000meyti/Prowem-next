import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const tableWrapVariants = cva(
  "min-w-0 overflow-x-auto rounded-md border-md border-border",
);

export const tableVariants = cva("w-full min-w-0 text-start text-sm");

export const tableHeaderVariants = cva("bg-panel text-foreground/70");

export const tableBodyVariants = cva(
  "[&>tr]:border-t [&>tr]:border-md [&>tr]:border-border",
);

export const tableRowVariants = cva("");

export const tableHeadVariants = cva("px-3 py-2 text-start font-medium");

export const tableCellVariants = cva("px-3 py-2 text-start");

export type TableProps = HTMLAttributes<HTMLTableElement> &
  VariantProps<typeof tableVariants>;

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

export function Table({ className, ...props }: TableProps) {
  return (
    <div className={tableWrapVariants()}>
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
