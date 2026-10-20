import Heading from '@/components/heading'
import React from 'react'
import InventoryItemListing from './_components/InventoryItemListing'

function page() {
  return (
  <div className="p-4">
      {/* Heading */}
      <div className="flex justify-between">
        <Heading>All Inventory Items </Heading>
        {/* <CreateSKUDialog/> */}
      </div>

      <div className="pt-4"></div>
      <InventoryItemListing />
    </div>
  )
}

export default page
