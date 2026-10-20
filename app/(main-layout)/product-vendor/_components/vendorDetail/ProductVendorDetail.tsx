'use client'
import { Avatar } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetSingleVendorDetailQuery } from "@/store/endpoints/vendorAPI"
import React from "react"
import VendorSKUListing from "./VendorSKUListing"


interface ProductVendorDetailProps{
    vendorId: string
}

function ProductVendorDetail({vendorId}: ProductVendorDetailProps) {

// ***** Vendor Information ***** 
const {data:vendor} = useGetSingleVendorDetailQuery(vendorId)
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <Card className="h-30 w-full justify-center">
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-2xl font-medium">
              MH
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold">{vendor?.data.name}</h1>
              <div className="text-muted-foreground">Phone: +1 32582341</div>
              <div className="text-muted-foreground">Email: hassan@dev.com</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="">
        <Tabs >
            <TabsList variant={"line"}>

            <TabsTrigger value="sku-items">SKUs</TabsTrigger>
            <TabsTrigger value="Purchase Orders">Purchase Orders</TabsTrigger>
            </TabsList>
            <TabsContent value={'sku-items'}>
              <VendorSKUListing vendorId={vendorId}/> 
            </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ProductVendorDetail
