import TabelCustomers from '@/components/dashboard/setting/customers/TabelCustomers'
import React from 'react'

export const metadata = {
  title: 'Dashboard | Setting Customers',
};

export default function page() {
  return (
    <div className='p-2 rounded-medium bg-white'><TabelCustomers /></div>
  )
}
