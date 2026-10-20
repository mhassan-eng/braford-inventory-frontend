'use client'
import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Plus } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import SKUListing from "../_components/VendorListing"
import VendorListing from "../_components/VendorListing"
import CreateProductVendorDialog from "../_components/CreateProductVendorDialog"

function page() {

  
  return (
    <div className="p-4">
      {/* Heading */}
      <div className="flex justify-between">
        <Heading>All Vendors </Heading>
        <CreateProductVendorDialog/>
        {/* <Button size={"lg"}><HugeiconsIcon icon={Plus}/>  Add Vendor</Button> */}
      </div>

      <div className="pt-4"></div>
      <VendorListing />
    </div>
  )
}

export default page
