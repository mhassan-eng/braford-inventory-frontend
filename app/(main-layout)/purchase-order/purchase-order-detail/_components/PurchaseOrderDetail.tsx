"use client"
import Heading from "@/components/heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { POBadgeColors } from "@/constants/PurchaseOrderConstants"
import { useGetPurchaseOrderDetailQuery } from "@/store/endpoints/purchaseOrderAPI"
import {
  Box,
  DateTimeIcon,
  DeliveryDelay01Icon,
  HugeiconsFreeIcons,
  LicenseThirdPartyIcon,
  Plus,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import React from "react"
import AddToInventoryPopover from "./AddToInventoryPopover"

interface PurchaseOrderDetailProps {
  id: string
}

function PurchaseOrderDetail({ id }: PurchaseOrderDetailProps) {
  const { data: purchaseOrder } = useGetPurchaseOrderDetailQuery(id)

  const createdAtDate = new Date(
    purchaseOrder?.data.createdAt || ""
  ).toLocaleDateString("en-us", {
    month: "long",
    day: "2-digit",
    weekday: "short",
    year: "numeric",
  })

  const expectedDeliveryDate = new Date(
    purchaseOrder?.data.deliveryDate || ""
  ).toLocaleDateString("en-us", {
    month: "long",
    day: "2-digit",
    weekday: "short",
    year: "numeric",
  })

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <Heading>
            Purchase Order{" - "}
            <span className="font-bold text-blue-700">
              {purchaseOrder?.data.code}
            </span>
          </Heading>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Status:</span>{" "}
            <Badge
              variant={POBadgeColors[purchaseOrder?.data.status as string]}
            >
              {purchaseOrder?.data.status}
            </Badge>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-xs text-muted-foreground">Total Order Price</div>
          <div className="text-2xl font-bold">
            Rs. {purchaseOrder?.data.totalPrice}
          </div>
        </div>
      </div>

      <div className="my-2">
        <Separator />
      </div>

      {/* ======== Details ======== */}

      <div className="grid grid-cols-3 rounded-lg border border-1 bg-white p-1 shadow-xs">
        <div className="flex items-center gap-4 border-r p-4">
          <div>
            <HugeiconsIcon icon={LicenseThirdPartyIcon} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs text-muted-foreground">Vendor Name</div>
            <div className="text-lg font-semibold">
              {purchaseOrder?.data.productVendors.name}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4">
          <div>
            <HugeiconsIcon icon={DateTimeIcon} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs text-muted-foreground">Created At</div>
            <div className="text-lg font-semibold">{createdAtDate}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 border-l p-4">
          <div>
            <HugeiconsIcon icon={DeliveryDelay01Icon} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs text-muted-foreground">
              Expected Delivery Date
            </div>
            <div className="text-lg font-semibold">{expectedDeliveryDate}</div>
          </div>
        </div>
      </div>

      {/* ======== Order Items ======== */}

      <div className="mt-4 rounded-lg border bg-white">
        <div className="rounded  p-2 text-sm font-medium">
          Order Items
        </div>
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">S#</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead className="text-center">Unit Price</TableHead>
              <TableHead className="text-center">Total QTY</TableHead>
              <TableHead className="text-center">Received</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="pr-4 text-end">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {purchaseOrder?.data.purchaseOrderItems.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell className="text-center">{index + 1} </TableCell>
                  <TableCell>{item.vendorSKU.sku.itemName} </TableCell>
                  <TableCell className="text-center">
                    {" "}
                    Rs. {item.vendorSKU.perUnitPrice}{" "}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.totalQuantity}{" "}
                  </TableCell>
                  <TableCell className="flex flex-col gap-1">
                    <div className="h-1 w-full rounded-full bg-gray-100">
                      <div
                        className="h-1 rounded-full bg-green-500"
                        style={{
                          width: `${(item.receivedQuantity / item.totalQuantity) * 100 || 0}%`,
                        }}
                      />{" "}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.receivedQuantity} / {item.totalQuantity}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {" "}
                    <Badge variant={POBadgeColors[item.status as string]}>
                      {item.status.split("_").join(" ")}
                    </Badge>{" "}
                  </TableCell>
                  <TableCell className="pr-4 text-end">
                    <AddToInventoryPopover
                      purchaseOrderItemId={item.id}
                      maxQuantity={item.totalQuantity - item.receivedQuantity}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default PurchaseOrderDetail
