import { APIResponse } from "@/types/response/APIResponse";
import { api } from "../api";
import { InventoryItem } from "@/types/inventory/InventoryItem";

export const inventoryApi = api.injectEndpoints({ 
    endpoints: (builder) => ({
        getAllInventoryItems: builder.query<APIResponse<InventoryItem[]>, void>({
            query: () =>({
                method: "GET",
                url: "/inventory"

            })
        })
        })
})

export const {useGetAllInventoryItemsQuery}  = inventoryApi