import { auth } from '@/auth';
import Quotation from '@/components/dashboard/quotation/ListQuotation';
import { prisma } from '@/libs/prisma';
import React from 'react'

export default async function page(props) {
  const params = (await props).searchParams;
  const id = (await params).id
  const session = await auth()
  const data = await prisma.quotation.findUnique({
    where: {
      id: Number(id)
    }, 
    include: {
      customer: true,
      sales: true,
      items: true,
      invoice: true,
    }
  })

  if (session.user.akses !== 'User') {
    return (
      <div className='p-2 rounded-medium bg-white'>
      <Quotation params={data} /></div>
    )
  } else {
    return (
      <div className='p-2 rounded-medium bg-white'>
      Anda tidak mempunyai akses.</div>
    )
  }
}