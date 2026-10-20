"use client";

import { Column } from "@tanstack/react-table";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUp01Icon,
  ArrowDown01Icon,
  ArrowUpDownIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

/**
 * Drop-in replacement for a plain header label. Give it as the `header`
 * of a column definition:
 *   header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />
 */
export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            />
          }
        >
          <span>{title}</span>
          {column.getIsSorted() === "desc" ? (
            <HugeiconsIcon icon={ArrowDown01Icon} size={16} className="ml-2" />
          ) : column.getIsSorted() === "asc" ? (
            <HugeiconsIcon icon={ArrowUp01Icon} size={16} className="ml-2" />
          ) : (
            <HugeiconsIcon icon={ArrowUpDownIcon} size={16} className="ml-2" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <HugeiconsIcon
              icon={ArrowUp01Icon}
              size={14}
              className="mr-2 text-muted-foreground/70"
            />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={14}
              className="mr-2 text-muted-foreground/70"
            />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <HugeiconsIcon
              icon={ViewOffIcon}
              size={14}
              className="mr-2 text-muted-foreground/70"
            />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}