export interface PurchaseOrder{

 productVendors: {
 id: number;
 name: string;
 };

 id: string;
 createdAt: Date;
 code: string;
 deliveryDate: Date;
 productVendorsId: number;
 totalPrice: number;
 status: "PENDING" | "COMPLETED" | "OVERDUE";

}