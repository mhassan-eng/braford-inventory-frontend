import { APIResponse } from "@/types/response/APIResponse";
import { api } from "../api";
import { SKUItem } from "@/types/sku/SKUItem";
import { CreateSingleSKU } from "@/types/sku/create-single-sku";
import { CreateVendorSKU } from "@/types/sku/CreateVendorSKU";
import { VendorSKU } from "@/types/sku/VendorSKU";


export const skuItemApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getAllSKU: builder.query<APIResponse<SKUItem[]>, void>({
            query: () => ({
                method: "GET",
                url: "/sku"
            }),
            providesTags: ["SKU"]
        }),
        
        createSingleSKU: builder.mutation<APIResponse<SKUItem>, CreateSingleSKU >({
            query: (body) => ({
                method: "POST",
                url: "/sku",
                body
            }),
            invalidatesTags: ["SKU"]
        }),

        getSKUListWithCode: builder.query<APIResponse<SKUItem[]>, {search?: string, group?: boolean, id?:string}>({
            query: (params) => ({
                method:"GET",
                url: "/sku/sku-list",
                params
            })
        }),

        createVendorSKU: builder.mutation<APIResponse<any>, CreateVendorSKU>({
            query: (body) =>({
                method: "POST",
                url: "sku/vendor-sku",
                body
            }),
            invalidatesTags: ["Vendor SKU"]
        }),

        getSingleVendorSKU: builder.query<APIResponse<VendorSKU[]>, string>({
            query: (id) => ({
                method: "GET",
                url: `sku/vendor-sku/${id}`
            }),
            providesTags: ["Vendor SKU"]
        })
    })
})


export const {useGetAllSKUQuery, useCreateSingleSKUMutation, useGetSKUListWithCodeQuery, useGetSingleVendorSKUQuery, useCreateVendorSKUMutation} = skuItemApi