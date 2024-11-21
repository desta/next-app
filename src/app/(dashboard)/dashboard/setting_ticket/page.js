import TabelCategoryTicket from '@/components/dashboard/ticket/category/TabelCategory'
import React from 'react'

export const metadata = {
  title: 'Dashboard | Setting Ticket',
};

export default function page() {
  return (
    <div className='p-2 rounded-medium bg-white'><TabelCategoryTicket /></div>
  )
}
