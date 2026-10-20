"use client"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { useCreateSingleProductVendorMutation } from "@/store/endpoints/vendorAPI"
import { FormProps } from "@/types/shared/FormProps"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const createProductVendorSchema = z.object({
  name: z.string().min(5, "Product name should at least be 5 characters"),
})

type CreateProductVendorType = z.infer<typeof createProductVendorSchema>

interface CreateProductVendorFormProps extends FormProps {}

function CreateProductVendorForm({
  afterSubmission,
}: CreateProductVendorFormProps) {
  const form = useForm<CreateProductVendorType>({
    resolver: zodResolver(createProductVendorSchema),
    defaultValues: {
      name: "",
    },
  })

  //* Submissions Logic
  const [createProductVendor] = useCreateSingleProductVendorMutation()
  const onSubmit = async (data: CreateProductVendorType) => {
    try {
      const res = await createProductVendor(data).unwrap()

      toast.success(res.message || "Created Successfully")

      afterSubmission?.()
    } catch (error: any) {
      toast.error(error.data.message || "There was an error")
    }
  }

  return (
    <div>
      <form
        id="create-product-vendor-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-product-vendor-name">
                  Name
                </FieldLabel>
                <Input
                  {...field}

                  id="create-product-vendor-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="E.g: John Doe"
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
    </div>
  )
}

export default CreateProductVendorForm
