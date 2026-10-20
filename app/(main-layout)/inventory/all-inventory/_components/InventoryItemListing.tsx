"use client"
import { DataTable } from "@/components/DataTable/data-table"
import { Badge } from "@/components/ui/badge"
import { InventoryBadgeColors } from "@/constants/InventoryItemConstants"
import { useGetAllInventoryItemsQuery } from "@/store/endpoints/inventoryAPI"
import { useGetAllSKUQuery } from "@/store/endpoints/skuItemAPI"
import { InventoryItem } from "@/types/inventory/InventoryItem"
import { SKUItem } from "@/types/sku/SKUItem"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

function InventoryItemListing() {
  const { data } = useGetAllInventoryItemsQuery()

  const columns: ColumnDef<InventoryItem>[] = [
    {
      accessorKey: "code",
      header: "Inventory Code",
      cell: ({row}) => {

          const inventoryCode = row.original.code
        return inventoryCode
      }
    },
    // {
    //   accessorKey: "productCode",
    //   header: "Product Code",
    //   cell: ({ row }) => {
    //     const productCodeValue = (row.getValue("productCode") as any).value

    //     return `PROD-${productCodeValue}`
    //   },
    // },
    {
      accessorKey: "name",
      header: "Item Name",
    },

    

    {
      accessorKey: "size",
      header: "Size",
      cell: ({row}) => {
        const size = row.original.size

        return (
            <Badge>{size} </Badge>
        )
      }
    },

    {
        accessorKey: "skuCode",
        header: "SKU Code",
        cell: ({row}) => {
            const skuCode = row.original.sku.code
            return skuCode
        }

    },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => {
          const status = row.original.status
    
          return (
            <Badge variant={InventoryBadgeColors[status]}>{status.split("_").join(" ")}</Badge>
          )
        }
      },

    {
        accessorKey: "purchaseOrderCode",
        header: "Purchase Order Code",
        cell: ({row}) => {
            const purchaseOrder  = row.original.purchaseOrder
            
            return (
                <Link href={`/purchase-order/purchase-order-detail/${purchaseOrder.id}`}>{purchaseOrder.code} </Link>
            )
        }
    },

    {
        accessorKey: "productVendors",
        header: "Vendor",
        cell: ({row}) => {
            const vendor = row.original.purchaseOrder.productVendors

              return (
                <>
                {vendor && 

                    <Link href={`/product-vendor/${vendor.id}`}>{vendor.name} </Link>
                }
                </>
            )
        }
    },
    // {
    //   accessorKey: "createdBy",
    //   header: "Added By",
    //   cell: ({ row }) => {
    //     const createdBy: string = (row.getValue("createdBy") as any).name

    //     return createdBy
    //   },
    // },
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

export default InventoryItemListing
