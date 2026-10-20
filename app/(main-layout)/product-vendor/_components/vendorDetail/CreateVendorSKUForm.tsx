"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxTrigger,
  ComboboxValue,
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
import { toNumber } from "@/lib/utils"
import {
  useCreateSingleSKUMutation,
  useCreateVendorSKUMutation,
  useGetSKUListWithCodeQuery,
} from "@/store/endpoints/skuItemAPI"
import { useGetAllVendorsQuery } from "@/store/endpoints/vendorAPI"
import { FormProps } from "@/types/shared/FormProps"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import React, { useEffect, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const vendorSKUSchema = z.object({
  skuId: z.string(),
  perUnitPrice: z.number(),
})

const createVendorSKUSchema = z.object({
  vendorId: z.string(),
  productCodeId: z.string(),
  // perUnitPrice: z.number(),
  sku: z.array(vendorSKUSchema),
})

type CreateVendorSKUType = z.infer<typeof createVendorSKUSchema>

interface VendorSKUFormProps extends FormProps {
  vendorId?: string
}

function CreateVendorSKUForm({
  afterSubmission,
  vendorId,
}: VendorSKUFormProps) {
  const form = useForm<CreateVendorSKUType>({
    resolver: zodResolver(createVendorSKUSchema),
    defaultValues: {
      vendorId: vendorId,
      productCodeId: "",
      sku: [],
      // perUnitPrice: 0,
    },
  })

  const { control, register } = form
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "sku",
  })

  //* Vendor List
  const [vendorSearch, setVendorSearch] = useState("")
  const debouncedVendorSearch = useDebounce<string>(vendorSearch, 500)
  const { data: vendors } = useGetAllVendorsQuery({
    name: debouncedVendorSearch || "",
  })

  //* SKU List
  const [searchTerm, setSearchTerm] = useState<string>("")
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const { data: existingSKU } = useGetSKUListWithCodeQuery({
    search: debouncedSearchTerm as string,
    group: true,
  })

  const selectedSKU = form.watch("productCodeId")

  const { data: variants } = useGetSKUListWithCodeQuery(
    {
      id: selectedSKU,
      group: false,
    },
    {
      skip: !selectedSKU,
    }
  )

  useEffect(() => {
    if (!variants) return
    for (let variant of variants?.data) {
      append({ skuId: variant.id, perUnitPrice: 0 })
    }
  }, [variants])
  //* Submissions Logic
  const [createVendorSKU] = useCreateVendorSKUMutation()

  const onSubmit = async (data: CreateVendorSKUType) => {
    try {
      console.log(data)
      const res = await createVendorSKU(data).unwrap()

      // toast.success(res.message || "Created Successfully")

      afterSubmission?.()
    } catch (error: any) {
      toast.error(error.data.message || "There was an error")
    }
  }

  return (
    <div>
      <form id="create-vendor-sku-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="vendorId"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-vendor-sku-item-vendor-id">
                  Vendor
                </FieldLabel>

                <Combobox
                  value={vendorId ?? field.value}
                  id="create-vendor-sku-item-vendor-id"
                  onValueChange={field.onChange}
                  items={vendors?.data}
                  disabled={Boolean(vendorId)}
                >
                  <ComboboxInput
                    onChange={(e) => {
                      setVendorSearch(e.target.value)
                    }}
                    disabled={Boolean(vendorId)}

                    value={
                      vendors?.data.find(
                        (vendor) => vendor.id === (vendorId ?? field.value)
                      )?.name ?? ""
                    }
                  />

                  <ComboboxContent>
                    {vendors?.data.map((vendor) => (
                      <ComboboxItem value={vendor.id} key={vendor.name}>
                        {vendor.name}
                      </ComboboxItem>
                    ))}
                  </ComboboxContent>
                </Combobox>
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
                <FieldLabel htmlFor="create-vendor-sku-item-sku-id">
                  SKU
                </FieldLabel>
                <div className="flex items-center gap-2">
                  <Combobox
                    value={field.value}
                    id="create-vendor-sku-item-sku-id"
                    onValueChange={field.onChange}

                    items={existingSKU?.data}
                  >
                    <ComboboxInput
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                      }}

                      value={
                        !field.value
                          ? searchTerm
                          : (existingSKU?.data.find(
                              (sku) => sku.productCode.id === field.value
                            )?.itemName ?? "")
                      }
                      className={"w-full"}

                      disabled={Boolean(field.value)}
                    />

                    <ComboboxContent>
                      {existingSKU?.data.map((sku) => (
                        <ComboboxItem
                          value={sku.productCode.id}
                          key={sku.id}
                          onClick={() => setSearchTerm(sku.itemName)}
                        >
                          <div className="flex flex-col gap-1">
                            <div className="">{sku.itemName}</div>
                            <div className="text-[9px] text-muted-foreground">
                              PRODUCT CODE: {sku.productCode.value}
                            </div>
                          </div>
                        </ComboboxItem>
                      ))}
                    </ComboboxContent>
                  </Combobox>
                  <div className="">
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={() => {
                        setSearchTerm("")
                        field.onChange("")
                        replace([])
                      }}
                    >
                      <HugeiconsIcon icon={X} />{" "}
                    </Button>
                  </div>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field>
            <FieldLabel htmlFor="create-vendor-sku-item-vendor-id">
              Variants{" "}
              <span className="text-muted-foreground">
                {" "}
                - {fields.length > 0 ? fields.length : 0} found{" "}
              </span>
            </FieldLabel>

            {variants &&
              selectedSKU &&
              fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-1 text-xs">
                    {
                      variants.data.find(
                        (variant) => variant.id === field.skuId
                      )?.itemName
                    }{" "}
                    <Badge>
                      {
                        variants.data.find(
                          (variant) => variant.id === field.skuId
                        )?.size
                      }
                    </Badge>{" "}
                  </div>
                  <div className="flex items-center gap-1">
                    $
                    <Input
                      className="w-20"
                      type="number"
                      {...register(`sku.${index}.perUnitPrice`, {
                        setValueAs: (value) => toNumber(value),
                      })}
                    />
                  </div>
                </div>
              ))}
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}

export default CreateVendorSKUForm
