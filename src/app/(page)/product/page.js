import { prisma } from '@/libs/prisma'
import React from 'react'
import parse from 'html-react-parser'
import Link from 'next/link'

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
    title: `Product | ${data.namaapp}` ,
    description: data.deskripsi,
    icons: {
      icon: data.favicon !== '' ? data.favicon : '/favicon.ico',
    },
  }
};

export default async function page() {
  const data = await prisma.product.findMany({
    include: {
      category: true,
      gallery: true,
    }
  })

  const install = await prisma.install.findFirst()
  if (install === null) return redirect('/install')
  else
    return (
      <>
        {data.length === 0 ?
          <div>
            <h1>No product created.</h1>
          </div>
          :
          <div>
            {data.map((item) =>
              <div key={item.id} className='pb-5'>
                <Link href={`/product/${item.title.toLowerCase().replaceAll(' ','_')}`} className='text-xl font-bold hover:text-primary hover:underline'>{item.title}</Link>
                <div>{parse(item.description)}</div>
              </div>
            )}
          </div>
        }
      </>
    )
}
