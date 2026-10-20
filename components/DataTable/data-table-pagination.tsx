"use client"

import { Table } from "@tanstack/react-table"
import {
  HugeiconsIcon} from '@hugeicons/react'
import {
  ArrowLeft01Icon,
  ArrowLeftDoubleIcon,
  ArrowRight01Icon,
  ArrowRightDoubleIcon,
  // DoubleArrowLeft01Icon,
  // DoubleArrowRight01Icon,
} from "@hugeicons/core-free-icons";


import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  pageSizeOptions?: number[]
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTablePaginationProps<TData>) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const totalCount = table.getFilteredRowModel().rows.length

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="text-sm text-muted-foreground">
        {selectedCount > 0
          ? `${selectedCount} of ${totalCount} row(s) selected.`
          : `${totalCount} row(s) total.`}
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[110px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {Math.max(table.getPageCount(), 1)}
        </div>
        <div className="flex items-center gap-2">
      <Button
  variant="outline"
  size="icon"
  className="h-8 w-8"
  onClick={() => table.setPageIndex(0)}
  disabled={!table.getCanPreviousPage()}
>
  <HugeiconsIcon icon={ArrowLeftDoubleIcon} size={16} />
</Button>

<Button
  variant="outline"
  size="icon"
  className="h-8 w-8"
  onClick={() => table.previousPage()}
  disabled={!table.getCanPreviousPage()}
>
  <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
</Button>

<Button
  variant="outline"
  size="icon"
  className="h-8 w-8"
  onClick={() => table.nextPage()}
  disabled={!table.getCanNextPage()}
>
  <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
</Button>

<Button
  variant="outline"
  size="icon"
  className="h-8 w-8"
  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
  disabled={!table.getCanNextPage()}
>
  <HugeiconsIcon icon={ArrowRightDoubleIcon} size={16} />
</Button>

        </div>
      </div>
    </div>
  )
}
