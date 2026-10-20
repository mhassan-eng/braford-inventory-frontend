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
import CreateNewSKUForm from "./CreateNewSKUForm"



function CreateSKUDialog() {
  const [open,setOpen] = useState(false)

  const afterSubmission = () => {
    setOpen(false)
 
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size={"lg"}>
            <HugeiconsIcon icon={Plus} /> Create New SKU
          </Button>
        }
      ></DialogTrigger>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>Create New SKU</DialogTitle>
        </DialogHeader>

        <CreateNewSKUForm afterSubmission={afterSubmission}/> 

        <DialogFooter>
            <Button type="submit" form="create-sku-form">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateSKUDialog
