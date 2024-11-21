import Install from '@/components/install/Install'
import { prisma } from '@/libs/prisma'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata = {
  title: 'Selamat datang',
};

export default async function page() {
  const install = await prisma.install.findFirst()

  if (install === null) {
  return (
    <div className='flex h-screen w-full flex-col justify-center items-center bg-secondary text-secondary-foreground'>
      <div className='min-h-[70%]'>
        <Install showStepNumber={true} />
      </div>
    </div>
  )
} else {
  return redirect('/')
}
}
