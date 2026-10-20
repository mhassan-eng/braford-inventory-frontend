import { ProductVendor } from "../product-vendor/ProductVendor"
import { PurchaseOrderItem } from "./PurchaseOrderItem"

export interface PurchaseOrderDetail{
    id: string,
    code: string,
    createdAt: string,
    deliveryDate: string,
    productVendorsId: string,
    totalPrice: number,
    status: "PENDING" | "COMPLETED" | "PARTIALLY_COMPLETED"
    productVendors: ProductVendor,
    purchaseOrderItems: PurchaseOrderItem[]
}