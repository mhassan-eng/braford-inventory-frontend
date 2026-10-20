import { VendorSKU } from "../sku/VendorSKU"

export interface PurchaseOrderItem{
    id: string,
    purchaseOrderId: string,
    vendorSKUId: string,
    perUnitPrice: number,
    totalQuantity: number,
    receivedQuantity: number,
    status: "PENDING" | "COMPLETED" | "PARTIALLY_COMPLETED"
    vendorSKU: VendorSKU


}