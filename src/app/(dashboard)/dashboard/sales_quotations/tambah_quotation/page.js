import { auth } from '@/auth';
import TambahQuotation from '@/components/dashboard/quotation/TambahQuotation';
import React from 'react'

export const metadata = {
  title: 'Dashboard | Tambah Quotation',
};

export default async function page() {
  const session = await auth()
  if (session.user.akses !== 'User') {
    return (
      <div className='p-2 rounded-medium bg-white'>
      <TambahQuotation /></div>
    )
  } else {
    return (
      <div className='p-2 rounded-medium bg-white'>
      Anda tidak mempunyai akses.</div>
    )
  }
}