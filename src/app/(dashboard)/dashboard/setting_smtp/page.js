import Smtp from '@/components/dashboard/setting/Smtp'
import { prisma } from '@/libs/prisma'
import React from 'react'

export const metadata = {
  title: 'Dashboard | Setting SMTP',
};

export default async function page() {
  const data = await prisma.smtp.findUnique({
    where: {
      id: 0
    }
  })
  return (
    <div className='p-2 rounded-medium bg-white'><Smtp params={data} /></div>
  )
}
