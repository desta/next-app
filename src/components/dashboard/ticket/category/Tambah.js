"use client"
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'
import React, { useState } from 'react'
import { fetchTicketCategory } from '@/redux/slices/TicketCategory';
import { BiCategory, BiUser } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

export default function Tambah() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [category, setCategory] = useState();
  const dispatch = useDispatch()
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/ticket/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
      }),
    })
    if (res.ok) {
      toast.success('Berhasil menambahkan category')
      setCategory('')
      dispatch(fetchTicketCategory())
      onOpenChange(close)
    } else {
      toast.error('Gagal menambahkan category')
    }
  }
  return (
    <>
      <Button onPress={onOpen} color='primary' className="text-primary-button">Tambah</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
        <ModalContent className='pt-5'>
          {(onClose) => (
            <form onSubmit={handleSubmitForm}>
              <ModalHeader className="flex flex-col gap-1">
                Tambah category ticket
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <Input
                    endContent={
                      <BiCategory className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    labelPlacement='outside'
                    className="font-bold"
                    color='primary'
                    label="Category"
                    placeholder="Category"
                    variant="bordered"
                    name="category"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
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
