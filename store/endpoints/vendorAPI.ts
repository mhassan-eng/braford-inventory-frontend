import { APIResponse } from "@/types/response/APIResponse"
import { api } from "../api"
import { ProductVendor } from "@/types/product-vendor/ProductVendor"
import { url } from "inspector"
import { CreateSingleVendor } from "@/types/product-vendor/CreateSingleVendor"
import { ProductVendorFilters } from "@/types/product-vendor/ProductVendorFilters"

export const vendorAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendors: builder.query<APIResponse<ProductVendor[]>, ProductVendorFilters>({
      query: (params) => ({
        method: "GET",
        url: "/product-vendor",
        params
      }),
      providesTags: ["Product Vendor"],
    }),

    createSingleProductVendor: builder.mutation<
      APIResponse<ProductVendor>,
      CreateSingleVendor
    >({
      query: (body) => ({
        method: "POST",
        url: "/product-vendor",
        body,
      }),
      invalidatesTags: ["Product Vendor"],
    }),

    getSingleVendorDetail: builder.query<APIResponse<ProductVendor>, string>({
      query: (id) => ({
        method: "GET",
        url: `/product-vendor/detail/${id}`,
      }),
      providesTags: ["Product Vendor"],
    }),
  }),
})

export const {
  useGetAllVendorsQuery,
  useCreateSingleProductVendorMutation,
  useGetSingleVendorDetailQuery,
} = vendorAPI
