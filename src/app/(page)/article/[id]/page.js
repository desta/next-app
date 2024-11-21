import parse from 'html-react-parser';
import { prisma } from '@/libs/prisma';
import React from 'react'
import TambahComment from '@/components/website/comment/TambahComment';
import { VscCalendar } from 'react-icons/vsc';
import { formatJam, formatTanggal } from '@/components/Utils';

export default async function page(props) {
    const params = (await props).searchParams;
    const id = (await params).id
    const data = await prisma.article.findUnique({
        where: {
            id: Number(id)
        },
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

    console.log('dat',data)
    return (
        <>
            <main>
                <div key={data.id} className='pb-3'>
                    <div className='text-3xl font-bold'>{data.title}</div>
                    <div className="flex items-center text-xs text-gray-400 font-normal gap-1 pb-3">Oleh {data.createdby.name} - <VscCalendar /> {formatTanggal(data.tanggal)} - {formatJam(data.tanggal)}</div>
                    <div>{parse(data.content)}</div>
                </div>
                <TambahComment params={data} />
            </main>
        </>
    )
}