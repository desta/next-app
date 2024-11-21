import { prisma } from '@/libs/prisma'
import React from 'react'

export async function metadata () {
  const data = await prisma.app.findUnique({
    where: {
      id: 0,
    },
    select: {
      namaapp: true,
      deskripsi: true,
      favicon: true,
    }
  })
  
  return{
    title: `Contact | ${data.namaapp}` ,
    description: data.deskripsi,
    icons: {
      icon: data.favicon !== '' ? data.favicon : '/favicon.ico',
    },
  }
};

export default function page() {
  return (
    <div>contact</div>
  )
}
