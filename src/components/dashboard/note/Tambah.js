"use client"
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Spinner, Textarea, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { BiPlus, BiUser } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTicketCategory } from '@/redux/slices/TicketCategory';
import { useSession } from 'next-auth/react';
import { fetchNotes } from '@/redux/slices/notes';
import { Editor } from '@/components/Editor';

export default function Tambah() {
  const session = useSession()
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [note, setNote] = useState('');

  useEffect(() => {
    dispatch(fetchNotes())
  }, [])

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/note', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        note
      }),
    })
    if (res.ok) {
      toast.success('Berhasil menambahkan catatan')
      setNote('')
      onOpenChange(close)
      dispatch(fetchNotes())
    } else {
      toast.error('Gagal menambahkan catatan')
    }
  }
  return (
    <>
      <Button onPress={onOpen} color='primary' className="text-primary-button hover:cursor-pointer" isIconOnly size='sm'><BiPlus size={24} /></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center' size='xl'>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmitForm}>
              <ModalHeader>Tambah catatan</ModalHeader>
              <ModalBody>
              <Editor value={note} onChange={setNote} />

                <div className="flex items-center justify-end gap-2 pt-5">
                  <Button
                    color="danger"
                    variant="light"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Tutup
                  </Button>
                  <Button type="submit" color="secondary" className="max-w-sm">
                    Simpan
                  </Button>
                </div>
              </ModalBody>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
