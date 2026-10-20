export interface SKUItem {
  id: string
  itemName: string
  size: Size
  createdAt: string
  code: string
  productCode: { id: string; value: string }
}
