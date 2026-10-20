"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCreatePurchaseOrderMutation } from "@/store/endpoints/purchaseOrderAPI"
import { useGetSingleVendorSKUQuery } from "@/store/endpoints/skuItemAPI"
import { useGetAllVendorsQuery } from "@/store/endpoints/vendorAPI"
import { zodResolver } from "@hookform/resolvers/zod"
import { toNumber } from "@/lib/utils"
import { PerfumeFreeIcons, Plus, Trash } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useRouter } from "next/navigation"
import React from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const purchaseOrderItemSchema = z.object({
  vendorSKUId: z.string(),
  totalQuantity: z.number(),
})
const createPurchaseOrderSchema = z.object({
  deliveryDate: z.string(),
  productVendorsId: z.string(),
  items: z.array(purchaseOrderItemSchema),
})

type CreatePurchaseOrderType = z.infer<typeof createPurchaseOrderSchema>

function CreatePurchaseOrderForm() {
  const router = useRouter()

  const form = useForm<CreatePurchaseOrderType>({
    resolver: zodResolver(createPurchaseOrderSchema),
    defaultValues: {
      deliveryDate: "",
      productVendorsId: "",
      items: [
        {
          vendorSKUId: "",
          totalQuantity: 0,
        },
        {
          vendorSKUId: "",
          totalQuantity: 0,
        },
        {
          vendorSKUId: "",
          totalQuantity: 0,
        },
      ],
    },
  })

  const { fields, remove, append, replace } = useFieldArray({
    control: form.control,
    name: "items",
  })

  //   ***** Vendor Selection Handling ******
  const { data: vendors } = useGetAllVendorsQuery({})

  const selectedVendor = form.watch("productVendorsId")

  const vendorName = vendors?.data.find(
    (vendor) => vendor.id === selectedVendor
  )?.name

  //   ******* Vendor SKU Handling ******

  const { data: vendorSKU } = useGetSingleVendorSKUQuery(selectedVendor, {
    skip: !selectedVendor,
  })
  // ****** Total Calculation Logic ******

  const items = form.watch("items")

  const totalQty = items.reduce((acc, curr) => {
    return acc + toNumber(curr.totalQuantity)
  }, 0)

  const totalPrice = items.reduce((acc, curr) => {
    const perUnitPrice =
      vendorSKU?.data.find((sku) => sku.id === curr.vendorSKUId)
        ?.perUnitPrice || 0

    const totalPrice = perUnitPrice * toNumber(curr.totalQuantity)

    return acc + totalPrice
  }, 0)

  //   ****** Form Submission ******
  const [createPurchaseOrder] = useCreatePurchaseOrderMutation()

  const onSubmit = async (data: CreatePurchaseOrderType) => {
    try {
      const res = await createPurchaseOrder(data).unwrap()

      toast.success(res.message ?? "Purcahse order created successfully")

      router.push("/purchase-order/all-purchase-order")
    } catch (error: any) {
      toast.error(error.data.message ?? "Purcahse order created successfully")
    }
  }

  return (
    <div className="bg-white flex w-full flex-col gap-2 rounded-lg border bg-primary/ shadow-sm">
      <form
        action=""
        id="create-po-form"
        className="my-4 flex flex-col gap-2 px-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-center justify-between">
          {/* PO Number  */}

          <div className="flex flex-col gap-2">
            {/* <Label className="text-gray-500">PURCHASE ORDER NO.</Label> */}
            <div className="text-success text-2xl font-bold text-blue-700">
              #PO-{vendorName ? vendorName.split(" ")[0] : "XXX"}-XXXX
            </div>
          </div>

          {/* Vendor Select */}
          <div className=""></div>
        </div>

        <FieldGroup className="mt-6 flex flex-row justify-normal gap-2">
          <Controller
            control={form.control}
            name="productVendorsId"
            render={({ field, fieldState }) => (
              <Field className={"w-50!"}>
                <FieldLabel htmlFor="create-po-vendor" className="">
                  Select Vendor
                </FieldLabel>

                <Select
                  id="create-po-vendor"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Vendor ">
                      {(selected) =>
                        vendors?.data.find((vendor) => vendor.id === selected)
                          ?.name ?? "Select Vendor"
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {vendors &&
                      vendors?.data.map((vendor) => (
                        <SelectItem value={vendor.id} key={vendor.id}>
                          {vendor.name}
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

          <Controller
            control={form.control}
            name="deliveryDate"
            render={({ field, fieldState }) => (
              <Field className={"w-50!"}>
                <FieldLabel className="">Select Expected Date</FieldLabel>
                <Input {...field} type="date" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup className="mt-4">
          <Table className="border-collapse">
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 border text-center">S#</TableHead>
                <TableHead className="border">Product</TableHead>
                <TableHead className="w-40 border">QTY</TableHead>
                <TableHead className="w-40 border">Price</TableHead>
                <TableHead className="w-15 border">{""}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => (
                <TableRow key={field.id} className="h-13">
                  <TableCell className="items-center border text-center">
                    {index + 1}
                  </TableCell>

                  {/* Product */}
                  <TableCell className="border">
                    <Controller
                      control={form.control}
                      name={`items.${index}.vendorSKUId`}
                      render={({ field }) => (
                        <div>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="h-8! w-full">
                              <SelectValue placeholder="Select Product ">
                                {(selected) => {
                                  const value = vendorSKU?.data.find(
                                    (product) => product.id === selected
                                  )
                                  return (
                                    <>
                                      {value ? (
                                        <>
                                          <div className="flex gap-2">
                                            {" "}
                                            {value.sku.itemName}{" "}
                                            <Badge>
                                              {value.sku.size}{" "}
                                            </Badge>{" "}
                                          </div>
                                        </>
                                      ) : (
                                        <> </>
                                      )}
                                    </>
                                  )
                                }}
                              </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                              {/* {products.map((product) => ( */}
                              {vendorSKU &&
                                vendorSKU.data.map((product) => (
                                  <SelectItem
                                    key={product.id}
                                    value={product.id}
                                  >
                                    {product.sku.itemName}{" "}
                                    <Badge>{product.sku.size} </Badge>
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>

                          <p className="mt-1 text-sm text-destructive">
                            {
                              form.formState.errors.items?.[index]?.vendorSKUId
                                ?.message
                            }
                          </p>
                        </div>
                      )}
                    />
                  </TableCell>

                  {/* Quantity */}
                  <TableCell className="border">
                    <div>
                      <Input
                        type="number"
                        {...form.register(`items.${index}.totalQuantity`, {
                          setValueAs: (value) => toNumber(value),
                        })}
                        className="h-8"
                      />

                      <p className="mt-1 text-sm text-destructive">
                        {
                          form.formState.errors.items?.[index]?.totalQuantity
                            ?.message
                        }
                      </p>
                    </div>
                  </TableCell>

                  {/* Total Price */}
                  <TableCell className="border">
                    {(vendorSKU?.data.find(
                      (product) => product.id === items[index]?.vendorSKUId
                    )?.perUnitPrice ?? 0) * toNumber(items[index]?.totalQuantity)}
                  </TableCell>

                  <TableCell className="border">
                    <Button
                      variant={"destructive"}
                      onClick={() => remove(index)}
                    >
                      {" "}
                      <HugeiconsIcon icon={Trash} />{" "}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              <TableRow className="hover:bg-none">
                <TableCell>
                  {" "}
                  <Button
                    size={"icon-lg"}
                    title="Add New Row"
                    onClick={() => {
                      append({
                        vendorSKUId: "",
                        totalQuantity: 0,
                      })
                    }}
                  >
                    {" "}
                    <HugeiconsIcon icon={Plus} />{" "}
                  </Button>{" "}
                </TableCell>
                <TableCell className="pr-4 text-end text-sm font-medium">
                  Totals
                </TableCell>
                <TableCell className="text-sm font-semibold">
                  {" "}
                  {totalQty} Pcs
                </TableCell>
                <TableCell className="text-sm font-semibold">
                  {" "}
                  Rs.{totalPrice}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </FieldGroup>
        <div className="flex justify-end gap-2">
          <Button size={"lg"}  type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreatePurchaseOrderForm
