"use client"
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Textarea, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { BiUser } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTicketCategory } from '@/redux/slices/TicketCategory';
import { fetchTickets } from '@/redux/slices/tickets';
import { fetchTicketUser } from '@/redux/slices/TicketUser';
import { useSession } from 'next-auth/react';
import { fetchTicketReply } from '@/redux/slices/TicketReply';

export default function Tambah() {
  const session = useSession()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [category, setCategory] = useState("");
  const [judul, setJudul] = useState();
  const [deskripsi, setDeskripsi] = useState();
  const dispatch = useDispatch()
  const categoryTicket = useSelector((state) => state.ticketcategory.data);
  // const ticket = useSelector(state => state.ticket.data)
  const ticketReply = useSelector(state => state.ticketreply.data)
  const ticketReplyFilter = useSelector(state => state.ticketreplyfilter.data)

  useEffect(() => {
    dispatch(fetchTicketCategory())
  }, [])

  const handleSelectionChange = (e) => {
    const biji = categoryTicket.filter((item) => {
      const id = parseInt(e.target.value);
      return item.id === id
    });
    setCategory(biji[0].category);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
        // judul: reJudul,
        judul,
        deskripsi,
      }),
    })
    if (res.ok) {
      toast.success('Berhasil menambahkan Ticket')
      setCategory('')
      dispatch(fetchTickets())
      dispatch(fetchTicketUser())
      onOpenChange(close)
    } else {
      toast.error('Gagal menambahkan Ticket')
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
                Tambah ticket
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <Select
                    labelPlacement='outside'
                    className="font-bold"
                    color='primary'
                    label="Category"
                    placeholder="Category"
                    variant="bordered"
                    id="category"
                    name="category"
                    onChange={handleSelectionChange}
                  >
                    {/* {(categoryTicket) => <SelectItem>{categoryTicket.category}</SelectItem>} */}
                    {categoryTicket.map((item) => (
                      <SelectItem key={item.id}>
                        {item.category}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    endContent={
                      <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    labelPlacement='outside'
                    className="font-bold"
                    color='primary'
                    label="Judul"
                    placeholder="Judul"
                    variant="bordered"
                    name="judul"
                    id="judul"
                    onChange={(e) => setJudul(e.target.value)}
                  />
                  <Textarea
                    labelPlacement='outside'
                    className="font-bold"
                    color='primary'
                    label="Deskripsi"
                    placeholder="Deskripsi"
                    variant="bordered"
                    name="deskripsi"
                    id="deskripsi"
                    onChange={(e) => setDeskripsi(e.target.value)}
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
