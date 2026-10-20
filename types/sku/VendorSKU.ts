import { SKUItem } from "./SKUItem"

export interface VendorSKU{
    id: string
    vendorId: string
    skuId: string
    perUnitPrice: number,
    sku: SKUItem,
    
 }
