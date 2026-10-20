import { LoginBody, LoginResponse } from "@/types/auth/Login.type";
import { api } from "../api";
import { APIResponse } from "@/types/response/APIResponse";


const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<APIResponse<LoginResponse>, LoginBody>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body
            })
        })
    })
})

export const {useLoginMutation} = authApi