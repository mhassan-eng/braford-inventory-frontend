"use client"

import React from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { toNumber } from "@/lib/utils"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { useCreateInventoryFromPOMutation } from "@/store/endpoints/purchaseOrderAPI"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { Box } from "@hugeicons/core-free-icons"

interface AddToInventoryProps {
  purchaseOrderItemId: string
  maxQuantity: number
}

const addToInventorySchema = z.object({
  purchaseOrderItemId: z.string(),
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
})

type AddToInventoryType = z.infer<typeof addToInventorySchema>

export default function AddToInventoryPopover({
  purchaseOrderItemId,
  maxQuantity,
}: AddToInventoryProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<AddToInventoryType>({
    resolver: zodResolver(addToInventorySchema),
    defaultValues: {
      purchaseOrderItemId,
      quantity: 1,
    },
  })

  React.useEffect(() => {
    setValue("purchaseOrderItemId", purchaseOrderItemId)
  }, [purchaseOrderItemId, setValue])

  const [createInventoryFromPO] = useCreateInventoryFromPOMutation()

  const onSubmit = async (data: AddToInventoryType) => {
    try {
      await createInventoryFromPO(data).unwrap()

      toast.success("Inventory Added and PO Adjusted Successfully")
    } catch (error: any) {
      toast.error(error?.data?.message || "There was an error, please try again")
    }
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button className="border-primary bg-primary/10 text-primary hover:bg-primary/15">
            <HugeiconsIcon icon={Box} />
            Add to Inventory
          </Button>
        }
      />

      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              name="quantity"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Quantity</FieldLabel>

                  <Input
                    type="number"
                    min={1}
                    max={maxQuantity}
                    value={field.value}
                    onChange={(e) => field.onChange(toNumber(e.target.value))}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />

                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            Add to Inventory
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}