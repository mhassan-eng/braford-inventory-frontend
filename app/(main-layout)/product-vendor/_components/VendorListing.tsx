"use client"
import { DataTable } from "@/components/DataTable/data-table"
import { useGetAllVendorsQuery } from "@/store/endpoints/vendorAPI"
import { ProductVendor } from "@/types/product-vendor/ProductVendor"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

function VendorListing() {
  const { data } = useGetAllVendorsQuery({})

  const columns: ColumnDef<ProductVendor>[] = [

    {
      accessorKey: "name",
      header: "Name",
      cell: ({row}) => {
        const id = row.original.id
        const name : string = row.getValue("name")
        return (
          <Link href={`/product-vendor/${id}`} className="hover:underline">{name}</Link>

        )
      }
    },

    
  ]
  return <div><DataTable
      data={data?.data ?? []}
      columns={columns}
    /></div>
}

export default VendorListing
