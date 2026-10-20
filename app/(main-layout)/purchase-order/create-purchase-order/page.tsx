import Heading from '@/components/heading'
import React from 'react'
import CreatePurchaseOrderForm from './_components/CreatePurchaseOrderForm'

function page() {
  return (
    <div className='p-4'>
      
      <Heading>Create Purchase Order</Heading>

      <div className="mt-4">
        <CreatePurchaseOrderForm /> 
      </div>
    </div>
  )
}

export default page
