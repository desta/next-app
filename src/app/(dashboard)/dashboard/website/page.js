
import Website from '@/components/website/Website'
import React from 'react'

export const metadata = {
  title: 'Dashboard | Setting Website',
};

export default function page() {
  return (
    <div className='p-2 rounded-medium bg-white'><Website /></div>
  )
}
