import { auth } from '@/auth';
import HalamanTicket from '@/components/dashboard/ticket/HalamanTicket';
import { prisma } from '@/libs/prisma';
import React from 'react'

export default async function page(props) {
  const params = (await props).searchParams;
  const id = (await params).id
  const session = await auth()
  const data = await prisma.ticket.findUnique({
    where: {
      id: Number(id)
    }
  })

  if (session.user.akses !== 'User') {
    return (
      <div className='p-2 rounded-medium bg-white'><HalamanTicket params={data} /></div>
    )
  } else if (session.user.id === data.userId) {
    return (
      <div className='p-2 rounded-medium bg-white'><HalamanTicket params={data} /></div>
    )
  } else {
    return (
      <div className='p-2 rounded-medium bg-white'>Anda tidak mempunyai akses.</div>
    )
  }
}