import TabelUser from '@/components/dashboard/setting/user/TabelUser'
import React from 'react'

export const metadata = {
  title: 'Dashboard | Setting User',
};

export default function page() {
  return (
    <div className='p-2 rounded-medium bg-white'><TabelUser /></div>
  )
}
