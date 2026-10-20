'use client'
import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Plus } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import SKUListing from "../_components/SKUListing"
import CreateSKUDialog from "../_components/CreateSKUDialog"

function page() {

  
  return (
    <div className="p-4">
      {/* Heading */}
      <div className="flex justify-between">
        <Heading>All Products </Heading>
        <CreateSKUDialog/>
      </div>

      <div className="pt-4"></div>
      <SKUListing />
    </div>
  )
}

export default page
