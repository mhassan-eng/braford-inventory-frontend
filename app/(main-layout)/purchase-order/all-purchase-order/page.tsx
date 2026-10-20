import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Plus } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import React from 'react'
import PurchaseOrderListing from './_components/PurchaseOrderListing'

function page() {
  return (
    <div className='p-4'>
      {/* Heading */}
      <div className="flex justify-between">

      <Heading>All Purchase Orders</Heading>
      <Button size={"lg"}><HugeiconsIcon icon={Plus}/> Create New PO</Button>
      </div>

<div className="pt-4"></div>
      <PurchaseOrderListing/> 
    </div>
  )
}

export default page
