'use client'
import { DataTable } from '@/components/DataTable/data-table'
import { Badge } from '@/components/ui/badge'
import { POBadgeColors } from '@/constants/PurchaseOrderConstants'
import { useGetAllPOQuery } from '@/store/endpoints/purchaseOrderAPI'
import { PurchaseOrder } from '@/types/purchase-order/PurchaseOrder'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import React from 'react'



function PurchaseOrderListing() {

const {data} = useGetAllPOQuery()

const columns : ColumnDef<PurchaseOrder>[] = [
  {
    accessorKey: "code",
    header: "PO#",
    cell: ({row}) => {
      return <Link href={`/purchase-order/purchase-order-detail/${row.original.id}`}>{row.original.code}</Link>
    }

  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {
      const status = row.original.status

      return (
        <Badge variant={POBadgeColors[status]}>{status}</Badge>
      )
    }
  },
  {
    accessorKey: "productVendors",
    header: "Vendor",
    cell: ({row}) => {
      const vendorName = (row.getValue("productVendors") as any).name
      return vendorName
    }
  },
  {
    accessorKey: "deliveryDate",
    header: "Expected Date",
    cell: ({row}) => {
      const deliveryDate : string= row.getValue("deliveryDate")
      const formatted = new Date(deliveryDate).toLocaleDateString('en-us',{
        day: 'numeric',
        weekday:'short', 
        month: "short",
        year:'numeric'

      })

      return formatted
    }
  },
  {
    accessorKey: "createdAt",
    header: "Created On",
    cell: ({row}) => {
      const createdAt : string= row.getValue("createdAt")
      const formatted = new Date(createdAt).toLocaleDateString('en-us',{
        day: 'numeric',
        weekday:'short', 
        month: "short",
        year:'numeric'

      })

      return formatted
    }
  }
]
  return (
    <div>

    {data && (

        <DataTable data={data.data} columns={columns}/> 
    )}
      
    </div>
  )
}

export default PurchaseOrderListing
