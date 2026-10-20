import { ProductVendor } from "../product-vendor/ProductVendor"
import { PurchaseOrder } from "../purchase-order/PurchaseOrder"
import { SKUItem } from "../sku/SKUItem"

export interface InventoryItem {
  id: string
  code: string
  name: string
  size: string
  skuId: string
  purchaseOrderId: string
  purchaseOrderItemId: string
  status:
    | "PENDING_QC"
    | "AVAILABLE"
    | "RESERVED"
    | "IN_TRANSIT"
    | "DAMAGED_HOLD"
    | "REJECTED"
    | "WRITTEN_OFF"
  price: number
  sku: SKUItem
  purchaseOrder: PurchaseOrder
  productVendors: ProductVendor
}
