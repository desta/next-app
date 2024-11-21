import { auth } from '@/auth'
import GetAccount from '@/components/dashboard/setting/user/GetAccount'
import { prisma } from '@/libs/prisma'
import React from 'react'

export default async function page() {
  const session = await auth()
  const data = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  })
  // console.log('dari page Account', data)
  // console.log('dari page Account', session)
  return (
    <div className='p-2 rounded-medium bg-white'>
      <GetAccount user={data} />
    </div>
  )
}
