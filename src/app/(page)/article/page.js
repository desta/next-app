import { prisma } from '@/libs/prisma'
import React from 'react'
import parse from 'html-react-parser';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from '@nextui-org/react';
import { formatJam, formatTanggal } from '@/components/Utils';

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
    title: `Article | ${data.namaapp}` ,
    description: data.deskripsi,
    icons: {
      icon: data.favicon !== '' ? data.favicon : '/favicon.ico',
    },
  }
};

export default async function page() {
  const data = await prisma.article.findMany({
    orderBy: [
      {
        title: 'asc',
      },
    ],
    include: {
      createdBy: true,
      category: true,
      Comment: {
        include: {
          user: true,
          CommentReply: {
            include: {
              user: true,
            }
          }
        }
      }
    },
  })
  return (
    <>
      {data === null ? <div>Belum ada artikel dibuat.</div>
        :
        <main>
          {data.map(article =>
            <div key={article.id} className='pb-2'>
              <Card className="max-w-[400px]">
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                  <div><Link href={`/article/id?id=${article.id}`} className='text-xl font-bold hover:cursor-pointer hover:text-[#1e52db]'>{article.title}</Link></div>
                    <div className="text-small text-default-500">{formatTanggal(article.tanggal)}-{formatJam(article.tanggal)}</div>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className='elipsys-content'>{parse(article.content)}</div>
                </CardBody>
                <Divider />              
              </Card>
            </div>
          )}
        </main>
      }
    </>
  )
}
