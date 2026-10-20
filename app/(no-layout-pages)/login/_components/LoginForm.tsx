

      "use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useLoginMutation } from "@/store/endpoints/authAPI"
import { useRouter } from "next/navigation"


const loginSchema = z.object({
    email: z.email("Email is required"),
    password: z.string()
}) 

type LoginFormData = z.infer<typeof loginSchema>



export function LoginForm() {

const router = useRouter()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [login] = useLoginMutation()

  const onSubmit = async (data: LoginFormData) =>  {
    try{
        const res = await login(data).unwrap()

        //* Saving the tokin in local storage
        localStorage.setItem("token", res.data.access_token)

        //* Redirect
        router.replace("/purchase-order/all-purchase-order")
        

    }catch(error : any){

    }
}

  return (
    <Card className="w-sm sm:max-w-md ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="login-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="example@aisquare.io"
                    autoComplete="off"
                  />
                
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="login-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          
          <Button type="submit" form="form-rhf-demo">
            Login
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}


  

export default LoginForm
