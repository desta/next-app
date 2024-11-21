import ProductPage from '@/components/website/product/ProductPage'
import React from 'react'

export const metadata = {
  title: 'Dashboard | Product',
};

export default function page() {
  return (
    <div className='p-2 rounded-medium bg-white'>
        <ProductPage />
    </div>
  )
}
