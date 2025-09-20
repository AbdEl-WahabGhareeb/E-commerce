import { getAllBrands } from '@/app/serveractions/brands.action'
import BrandsDisplay from '@/components/BrandsComponent/BrandsDisplay';
import React from 'react'

export default async function Brands() {

  const brands = await getAllBrands()
  console.log(brands, "brands");
  
  return (


   <div className="container mx-auto text-2xl text-center mt-20">
      <p className="font-bold text-4xl text-green-600 py-10">All Brands</p>
      
      <BrandsDisplay brands={brands?.data}/>
    </div>
  )
}
