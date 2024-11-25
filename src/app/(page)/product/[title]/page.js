import React from 'react'
import { prisma } from '@/libs/prisma'
import parse from 'html-react-parser'
import GalleryProduct from '@/components/website/product/GalleryProduct'

export async function generateMetadata({ params }) {
  const slug = (await params).title.replaceAll('_', ' ')
  const app = await prisma.app.findUnique({
    where: {
      id: 0,
    },
    select: {
      namaapp: true,
      deskripsi: true,
      favicon: true,
    }
  })
  const data = await prisma.product.findUnique({
    where: {
      title: slug
    },
  })
  return {
    title: data?.title === undefined ? `Product not found | ${app.namaapp}` : `${data.title} | ${app.namaapp}`,
    description: app.deskripsi,
    icons: {
      icon: app.favicon !== '' ? app.favicon : '/favicon.ico',
    },
  }
};

export default async function page({ params }) {
  const install = await prisma.install.findFirst()
  const slug = (await params).title.replaceAll('_', ' ')
  const data = await prisma.product.findUnique({
    where: {
      title: slug
    },
    include: {
      image: true,
    }
  })

  const images = data?.image.map((item) => {
    return { original: item.image, thumbnail: item.image }
  })

  if (install === null) return redirect('/install')
  else
    return (
      <>
        {data === null ?
          <div>
            <h1>Product not found.</h1>
          </div>
          :
          <div className='prose prose-indigo max-w-none'>
            <h1 className=''>{data.title}</h1>
            <div key={data.id} className='pb-5'>
              <div className='xl:float-left xl:mr-3 xl:mb-3'>
                {data.image.length !== 0 &&
                  <GalleryProduct images={images} />
                }
              </div>
              <div>{parse(data.content)}</div>
            </div>
          </div>
        }
      </>
    )
}
