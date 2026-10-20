"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import React, { useState } from "react"
import CreateProductVendorForm from "./CreateProductVendorForm"



function CreateProductVendorDialog() {
  const [open,setOpen] = useState(false)

  const afterSubmission = () => {
    setOpen(false)
 
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size={"lg"}>
            <HugeiconsIcon icon={Plus} /> Add New Vendor
          </Button>
        }
      ></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Vendor</DialogTitle>
        </DialogHeader>

        <CreateProductVendorForm afterSubmission={afterSubmission}/> 

        <DialogFooter>
            <DialogClose render={<Button variant={"outline"} >Close</Button>}/> 
            <Button type="submit" form="create-sku-form">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateProductVendorDialog
