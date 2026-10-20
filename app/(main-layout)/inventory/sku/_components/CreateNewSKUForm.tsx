"use client"
import { Badge } from "@/components/ui/badge"
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
} from "@/components/ui/combobox"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useDebounce from "@/hooks/use-debounce"
import {
  useCreateSingleSKUMutation,
  useGetSKUListWithCodeQuery,
} from "@/store/endpoints/skuItemAPI"
import { FormProps } from "@/types/shared/FormProps"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const createSKUSchema = z.object({
  itemName: z.string().min(5, "Product name should at least be 5 characters"),
  size: z.enum(["XS", "S", "M", "L", "XL", "XXL"]),
  productCodeId: z.string().optional(),
})

type CreateSKUType = z.infer<typeof createSKUSchema>

interface SKUFormProps extends FormProps{

}

function CreateNewSKUForm({afterSubmission} : SKUFormProps) {
  const form = useForm<CreateSKUType>({
    resolver: zodResolver(createSKUSchema),
    defaultValues: {
      itemName: "",
      size: "S",
      productCodeId: "",
    },
  })

  //* SKU List
  const [searchTerm, setSearchTerm] = useState<string>("")
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500)
  const { data: existingSKU } = useGetSKUListWithCodeQuery({
    search: debouncedSearchTerm as string,
  })

  //* Submissions Logic
  const [createSingleSKU] = useCreateSingleSKUMutation()

  const onSubmit = async (data: CreateSKUType) => {
    try {
      const res = await createSingleSKU(data).unwrap()

      toast.success(res.message || "Created Successfully")

      afterSubmission?.()
    } catch (error: any) {
      toast.error(error.data.message || "There was an error")
    }
  }

  return (
    <div>
      <form id="create-sku-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="itemName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-sku-item-name">Name</FieldLabel>
                <Input
                  {...field}
                  onChange={(e) => {
                    ;(field.onChange(e.target.value),
                      setSearchTerm(e.target.value))
                  }}
                  id="create-sku-item-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Eg: Black Leather Jacket"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="size"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-sku-item-size">Size</FieldLabel>
                {/* <Input
                  {...field}
                  id="create-sku-item-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Eg: Black Leather Jacekt"
                  autoComplete="off"
                /> */}
                <Select
                  value={field.value}
                  id="create-sku-item-size"
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Size" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value={"XS"}>XS</SelectItem>
                    <SelectItem value={"S"}>S</SelectItem>
                    <SelectItem value={"M"}>M</SelectItem>
                    <SelectItem value={"L"}>L</SelectItem>
                    <SelectItem value={"XL"}>XL</SelectItem>
                    <SelectItem value={"XXL"}>XXL</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="productCodeId"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-sku-item-product-code">
                  Existing SKU
                </FieldLabel>
                {/* <Input
                  {...field}
                  id="create-sku-item-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Eg: Black Leather Jacekt"
                  autoComplete="off"
                /> */}

                <Select value={field.value} onValueChange={field.onChange} disabled={existingSKU?.data.length === 0}>
                  <SelectTrigger id="create-sku-item-product-code">
                    <SelectValue placeholder="Link with Existing SKU">
                      {(value: string) => {
                        const selectedSku = existingSKU?.data.find(
                          (sku) => sku.productCode.value === value
                        )

                        if (!selectedSku) return "Link with Existing SKU"

                        return (
                          <div className="flex w-full justify-between gap-2 p-1">
                            <div>{selectedSku.itemName}</div>
                            <Badge className="mr-4">
                              Size: {selectedSku.size}
                            </Badge>
                          </div>
                        )
                      }}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {existingSKU?.data.map((sku) => (
                      <SelectItem key={sku.id} value={sku.productCode.value}>
                        <div className="flex w-full justify-between gap-2 p-1">
                          <div>{sku.itemName}</div>
                          <Badge className="mr-4">Size: {sku.size}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

export default CreateNewSKUForm
