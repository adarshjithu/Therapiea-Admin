import { cn } from "@/lib/utils";
import * as React from "react";

export function Table({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="z-0 relative w-full overflow-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table
        className={cn(
          "w-full text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function TableHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn(
        "bg-gray-100 dark:bg-gray-800 [&>tr>th]:border-b [&>tr>th]:border-gray-300 dark:[&>tr>th]:border-gray-700",
        className
      )}
      {...props}
    />
  );
}

export function TableBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn(
        "bg-white dark:bg-gray-900 [&>tr:last-child]:border-b-0 [&>tr:hover]:bg-gray-50 dark:[&>tr:hover]:bg-gray-800",
        className
      )}
      {...props}
    />
  );
}

export function TableFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot
      className={cn(
        "border-t bg-gray-50 dark:bg-gray-900 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

export function TableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "border-b transition-colors dark:border-gray-700",
        className
      )}
      {...props}
    />
  );
}

export function TableHead({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider",
        className
      )}
      {...props}
    />
  );
}

export function TableCell({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        "px-4 py-3 text-sm text-gray-700 dark:text-gray-200",
        className
      )}
      {...props}
    />
  );
}
