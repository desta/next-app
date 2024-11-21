"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Avatar } from '@nextui-org/react'
import React from 'react'
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ReplyComment({ params }) {
  const session = useSession()
  const router = useRouter()
  const [nama, setNama] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    if (nama === '') {
      const res = await fetch('/api/commentReply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          user: session.data.user.id,
          comment: params.id
        }),
      })
      if (res.ok) {
        router.refresh()
        toast.success('Balasan berhasil terkirim')
        setNama('')
        setContent('')
      } else {
        toast.error('Gagal kirim balasan')
      }
    } else {
      const res = await fetch('/api/commentReply/anonim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama,
          content,
          comment: params.id
        }),
      })
      if (res.ok) {
        router.refresh()
        toast.success('Balasan berhasil terkirim')
        setNama('')
        setContent('')
      } else {
        toast.error('Gagal kirim balasan')
      }
    }

  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button size="sm" onPress={onOpen} color='primary' className="text-primary-button" radius="full">Balas</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmitForm}>
              <ModalHeader className="flex flex-col gap-1">Balas komentar</ModalHeader>
              <ModalBody>
                <div className='flex flex-col gap-2'>
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
                  <Textarea placeholder='Isi comment...' onChange={(e) => setContent(e.target.value)} />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Keluar
                </Button>
                <Button type='submit' color="secondary">
                  Simpan
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
