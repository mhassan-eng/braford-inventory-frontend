"use client"
import { DataTable } from "@/components/DataTable/data-table"
import { useGetSingleVendorSKUQuery } from "@/store/endpoints/skuItemAPI"
import { SKUItem } from "@/types/sku/SKUItem"
import { ColumnDef } from "@tanstack/react-table"
import CreateVendorSKUDialog from "./CreateVendorSKUDialog"
import { VendorSKU } from "@/types/sku/VendorSKU"
import { Badge } from "@/components/ui/badge"

function VendorSKUListing({vendorId} : {vendorId:string}) {
  const { data } = useGetSingleVendorSKUQuery(vendorId)

  const columns: ColumnDef<VendorSKU>[] = [
    {
      accessorKey: "code",
      header: "SKU#",
      cell: ({row}) => {
        const skuCode = row.original.sku.code 
        return skuCode
      }
    },
    
    {
      accessorKey: "productCode",
      header: "Product Code",
      cell: ({row}) => {
        const productCode = row.original.sku.productCode.value

        return `PROD-${productCode}`
      }
    },
    
    {
      accessorKey: "itemName",
      header: "Item Name",
      cell: ({row}) => {
        const name = row.original.sku.itemName

        return name
      }
    },
    {
      accessorKey: "size",
      header: "Size",
      cell: ({row}) => {
        const size = row.original.sku.size

        return <Badge>{size} </Badge>
      }
    },
    {
      accessorKey: "perUnitPrice",
      header: "Price/Unit"
    }

    // {
    //   accessorKey: "productCode",
    //   header: "Product Code",
    //   cell: ({ row }) => {
    //     const productCodeValue = (row.getValue("productCode") as any).value

    //     return `PROD-${productCodeValue}`
    //   },
    // },
    // {
    //   accessorKey: "itemName",
    //   header: "Name",
    // },

    // {
    //   accessorKey: "createdBy",
    //   header: "Added By",
    //   cell: ({ row }) => {
    //     const createdBy: string = (row.getValue("createdBy") as any).name

    //     return createdBy
    //   },
    // },
    // {
    //   accessorKey: "createdAt",
    //   header: "Created On",
    //   cell: ({ row }) => {
    //     const createdAt: string = row.getValue("createdAt")
    //     const formatted = new Date(createdAt).toLocaleDateString("en-us", {
    //       day: "numeric",
    //       weekday: "short",
    //       month: "short",
    //       year: "numeric",
    //     })

    //     return formatted
    //   },
    // },
  ]
  return (
  <div>

    <div className="w-full flex justify-between">
        <div className=""></div>
        <div className="">
          <CreateVendorSKUDialog vendorId={vendorId}/> </div>
    </div>
    {data && <DataTable data={data.data} columns={columns} />}
    </div>)
}

export default VendorSKUListing
