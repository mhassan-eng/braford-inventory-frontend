'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import PurchaseOrderDetail from '../_components/PurchaseOrderDetail'



function page() {

    const {id} = useParams()
    return (
    <div className='p-4'>
      <PurchaseOrderDetail id={id as string} /> 
    </div>
  )
}

export default page
