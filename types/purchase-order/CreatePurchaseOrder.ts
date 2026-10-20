export interface CreatePurchaseOrder{
    deliveryDate: string,
    productVendorsId: string,
    items: {
        vendorSKUId: string,
        totalQuantity: number
    }[]
}