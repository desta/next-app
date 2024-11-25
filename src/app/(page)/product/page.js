import { prisma } from '@/libs/prisma'
import React from 'react'
import parse from 'html-react-parser'
import Link from 'next/link'
import Image from 'next/image'

export async function metadata() {
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

  return {
    title: `Product | ${data.namaapp}`,
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
      image: true,
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
              <div key={item.id} className='prose max-w-none prose-a:no-underline'>
                {item.image.length !== 0 && <Image src={item.image[0].image} alt={item.title} width={200} height={300} className='float-left h-80 w-52 rounded-md mr-3 mb-3' />}                
                  <Link href={`/product/${item.title.toLowerCase().replaceAll(' ', '_')}`}><h1 className='mb-0 text-primary hover:underline'>{item.title}</h1></Link>
                  <div className='line-clamp-[10]'>{parse(item.description)}</div>
              </div>
            )}
          </div>
        }
      </>
    )
}
