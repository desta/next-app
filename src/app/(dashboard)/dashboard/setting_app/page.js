
import App from '@/components/dashboard/setting/App'
import { prisma } from '@/libs/prisma'
import React from 'react'

export const metadata = {
  title: 'Dashboard | Setting App',
};

export default async function page() {
  const app = await prisma.app.findFirst({
    where: {
      id: 0
    }
  })
  return (
    <div className='p-2 rounded-medium bg-white'><App params={app} /></div>
  )
}
