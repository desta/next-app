import Pages from '@/components/website/pages/Pages';
import React from 'react'

export const metadata = {
  title: 'Dashboard | Pages',
};

export default function page() {
  return (
    <div className='p-2 rounded-medium bg-white'>
      <Pages />
    </div>
  )
}
