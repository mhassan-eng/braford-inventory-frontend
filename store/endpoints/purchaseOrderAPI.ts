import { APIResponse } from "@/types/response/APIResponse"
import { api } from "../api"
import { PurchaseOrder } from "@/types/purchase-order/PurchaseOrder"
import { CreatePurchaseOrder } from "@/types/purchase-order/CreatePurchaseOrder"
import { PurchaseOrderDetail } from "@/types/purchase-order/PurchaseOrderDetail"
import { CreateInventoryFromPO } from "@/types/purchase-order/CreateInventoryFromPO"

export const purchaseOrderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPO: builder.query<APIResponse<PurchaseOrder[]>, void>({
      query: () => ({
        method: "GET",
        url: "/purchase-order",
      }),
      providesTags: ["Purchase Order"],
    }),

    createPurchaseOrder: builder.mutation<
      APIResponse<PurchaseOrder>,
      CreatePurchaseOrder
    >({
      query: (body) => ({
        method: "POST",
        url: "/purchase-order",
        body,
      }),
      invalidatesTags: ["Purchase Order"],
    }),

    getPurchaseOrderDetail: builder.query<
      APIResponse<PurchaseOrderDetail>,
      string
    >({
      query: (id) => ({
        method: "GET",
        url: `/purchase-order/${id}`,
      }),
      providesTags: ["Purchase Order"],
    }),

    createInventoryFromPO: builder.mutation<any, CreateInventoryFromPO>({
      query: (body) => ({
        method: "POST",
        url: "/purchase-order/create-inventory",
        body,
      }),
      invalidatesTags: ["Purchase Order"],
    }),
  }),
})

export const {
  useGetAllPOQuery,
  useCreatePurchaseOrderMutation,
  useGetPurchaseOrderDetailQuery,
  useCreateInventoryFromPOMutation,
} = purchaseOrderApi
