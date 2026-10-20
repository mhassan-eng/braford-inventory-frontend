'use client'

import React from 'react'
import ProductVendorDetail from '../_components/vendorDetail/ProductVendorDetail'
import { useParams } from 'next/navigation'

function page() {

    const {id} = useParams()
  return (
    <div className='p-4'>
      <ProductVendorDetail vendorId={id as string}/> 
    </div>
  )
}

export default page
