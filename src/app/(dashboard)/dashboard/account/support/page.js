import Support from '@/components/dashboard/Support'
import React from 'react'

export default function page() {
  return (
    <div>
      <div className='text-2xl font-bold mb-4'>
        Kirim pesan untuk <span className='text-primary'>Support</span>
      </div>
      <Support />
    </div>
  )
}
