export interface CreateVendorSKU {
  vendorId: string
  productCodeId: string
  sku: {
    skuId: string
    perUnitPrice: number
  }[]
}
