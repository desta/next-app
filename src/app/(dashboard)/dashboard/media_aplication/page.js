import TabelMediaAplication from '@/components/website/media_aplication/TabelMediaAplication';
import React from 'react'

export const metadata = {
  title: 'Dashboard | Media aplication',
};

export default function page() {
  return (
    <div className='p-2 rounded-medium bg-white'>
      <TabelMediaAplication />
    </div>
  )
}
