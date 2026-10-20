"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  Row,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTablePagination } from "./data-table-pagination";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Column id used for the global quick-search input. Omit to hide search. */
  searchColumn?: string;
  searchPlaceholder?: string;
  /** Optional extra toolbar content (filters, buttons, etc.) rendered left of the view-options menu. */
  toolbar?: React.ReactNode;
  /** Called with the currently selected rows' original data whenever selection changes. */
  onRowSelectionChange?: (rows: TData[]) => void;
  /** Enables the row-selection checkbox column. Requires a "select" column in `columns` (see helper below). */
  enableRowSelection?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
  /**
   * Determines whether a given row can expand to show `renderSubComponent`.
   * Omit entirely to keep the table flat (no expand column, no behavior change).
   */
  getRowCanExpand?: (row: Row<TData>) => boolean;
  /** Rendered full-width beneath a row when it's expanded. Required if `getRowCanExpand` is passed. */
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchColumn,
  searchPlaceholder = "Filter...",
  toolbar,
  onRowSelectionChange,
  enableRowSelection = false,
  isLoading = false,
  emptyMessage = "No results.",
  getRowCanExpand,
  renderSubComponent,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
    },
    enableRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  React.useEffect(() => {
    if (!onRowSelectionChange) return;
    const selected = table.getSelectedRowModel().rows.map((r) => r.original);
    onRowSelectionChange(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 items-center gap-2">
          {searchColumn && (
            <Input
              placeholder={searchPlaceholder}
              value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn(searchColumn)?.setFilterValue(event.target.value)
              }
              className="h-9 max-w-sm"
            />
          )}
          {toolbar}
        </div>
        {/* <DataTableViewOptions table={table} /> */}
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                // React.Fragment lets us emit two <TableRow>s (main + sub-row) per
                // table row without breaking out of <TableBody>'s row list.
                <React.Fragment key={row.id}>
                  <TableRow data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && renderSubComponent && (
                    <TableRow>
                      <TableCell colSpan={row.getVisibleCells().length} className="p-0">
                        {renderSubComponent({ row })}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}