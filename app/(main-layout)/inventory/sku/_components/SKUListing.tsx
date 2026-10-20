"use client"
import { DataTable } from "@/components/DataTable/data-table"
import { useGetAllSKUQuery } from "@/store/endpoints/skuItemAPI"
import { SKUItem } from "@/types/sku/SKUItem"
import { ColumnDef } from "@tanstack/react-table"
import { registerWorkerScheduler } from "next/dist/build/swc/generated-native"

function SKUListing() {
  const { data } = useGetAllSKUQuery()

  const columns: ColumnDef<SKUItem>[] = [
    {
      accessorKey: "code",
      header: "SKU#",
    },
    {
      accessorKey: "productCode",
      header: "Product Code",
      cell: ({ row }) => {
        const productCodeValue = (row.getValue("productCode") as any).value

        return `PROD-${productCodeValue}`
      },
    },
    {
      accessorKey: "itemName",
      header: "Name",
    },

    {
      accessorKey: "size",
      header: "Size",
    },
    {
      accessorKey: "createdBy",
      header: "Added By",
      cell: ({ row }) => {
        const createdBy: string = (row.getValue("createdBy") as any).name

        return createdBy
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created On",
      cell: ({ row }) => {
        const createdAt: string = row.getValue("createdAt")
        const formatted = new Date(createdAt).toLocaleDateString("en-us", {
          day: "numeric",
          weekday: "short",
          month: "short",
          year: "numeric",
        })

        return formatted
      },
    },
  ]
  return <div>{data && <DataTable data={data.data} columns={columns} />}</div>
}

export default SKUListing
