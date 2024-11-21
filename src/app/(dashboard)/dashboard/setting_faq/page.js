import TabelFaq from '@/components/dashboard/setting/faq/TabelFaq'
import React from 'react'

export const metadata = {
  title: 'Dashboard | Setting FAQ',
};

export default function page() {
  return (
    <div className='p-2 rounded-medium bg-white'><TabelFaq /></div>
  )
}
