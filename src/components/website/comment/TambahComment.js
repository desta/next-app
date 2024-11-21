'use client'
import React from 'react'
import { Textarea, Input } from "@nextui-org/input";
import { Avatar, Button, Divider } from '@nextui-org/react';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ReplyComment from './ReplyComment';
import { formatJam, formatTanggal } from '@/components/Utils';
import { VscCalendar } from "react-icons/vsc";

export default function TambahComment({ params }) {
    const session = useSession()
    const router = useRouter()
    const [nama, setNama] = React.useState();
    const [content, setContent] = React.useState();
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        if (nama === '') {
            const res = await fetch('/api/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content,
                    article: params.id,
                    user: session.data.user.id
                }),
            })
            if (res.ok) {
                toast.success('Berhasil menambahkan comment')
                setNama('')
                setContent('')
                router.refresh()
            } else {
                toast.error('Gagal menambahkan comment')
            }
        } else {
            const res = await fetch('/api/comment/anonim', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nama,
                    content,
                    article: params.id,
                }),
            })
            if (res.ok) {
                toast.success('Berhasil menambahkan comment')
            }
        }
    }

    return (
        <div>
            <p className='font-bold'>Tambah komentar</p>
            <form onSubmit={handleSubmitForm} className='flex flex-col gap-2 pt-3'>
                {session.status !== "authenticated" ?
                    <Input
                        isRequired
                        labelPlacement='outside-left'
                        className="font-bold max-w-xs"
                        color='primary'
                        label="Nama"
                        placeholder="Nama anda"
                        variant="bordered"
                        name="nama"
                        id="nama"
                        onChange={(e) => setNama(e.target.value)}
                    />
                    :
                    <p>Nama: <span className='font-bold text-primary'>{session.data?.user.name}</span></p>
                }
                <Textarea placeholder='Isi komentar...' onChange={(e) => setContent(e.target.value)} isRequired />
            </form>
            <div className='text-right py-3'>
                <Button color='secondary' onClick={handleSubmitForm}>Kirim</Button>
            </div>
            <p className='font-bold'>Komentar</p>
            {params.Comment.map((idx) =>
                <div className="flex w-full justify-between border rounded-medium mb-3" key={idx.id}>
                    <div className="p-3 w-full">
                        <div className="flex gap-3 items-center">
                            <Avatar />
                            <h3 className="font-bold">
                                {idx.nama === null ? <span className='text-primary'>{idx.user?.name}</span> : idx.nama }
                                <div className="flex items-center text-xs text-gray-400 font-normal gap-1"><VscCalendar /> {formatTanggal(idx.tanggal)} - {formatJam(idx.tanggal)}</div>
                            </h3>
                        </div>
                        <p className="text-gray-600 mt-2 pb-2">
                            {idx.content}
                        </p>
                        <ReplyComment params={idx} />
                        {/*reply */}
                        {idx.CommentReply.map((idx) =>
                            <div key={idx.id} className='w-full'>
                                <Divider orientation="vertical" className='h-[20px] ml-8 bg-primary' />
                                <div className="border rounded-medium">
                                    <div className="p-3 w-full">
                                        <div className="flex gap-3 items-center">
                                            <Avatar />
                                            <h3 className="font-bold">
                                                {idx.nama === null ? <span className='text-primary'>{idx.user?.name}</span> : idx.nama}
                                                <div className="flex items-center text-xs text-gray-400 font-normal gap-1"><VscCalendar /> {formatTanggal(idx.tanggal)} - {formatJam(idx.tanggal)}</div>
                                            </h3>
                                        </div>
                                        <p className="text-gray-600 mt-2">
                                            {idx.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
