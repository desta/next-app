"use client"
import { Button, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Textarea, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTicket } from '@/redux/slices/ticket';
import { useRouter } from 'next/navigation';
import { fetchTicketReply } from '@/redux/slices/TicketReply';
import { fetchTicketReplyFilter } from '@/redux/slices/TicketReplyFilter';

export default function Balas({ params }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [reply, setReply] = useState();
  const [status, setStatus] = useState(false);
  const ticket = useSelector(state => state.ticket.data);
  const ticketReply = useSelector(state => state.ticketreply.data);
  const ticketReplyFilter = useSelector(state => state.ticketreplyfilter.data);

  console.log("data ticket", ticket)
  // console.log("data ticketreply", ticketReply)

  useEffect(() => {
    dispatch(fetchTicketReplyFilter(params.id))
  }, [])

  const statuses = [
    { key: 'Open', label: 'Open' },
    { key: 'Closed', label: 'Closed' },
  ];

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (ticketReply.userId === ticket.userId) {
      const res = await fetch(`/api/ticket/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: params.id,
          reply
        }),
      })
      if (res.ok) {
        toast.success('Berhasil membalas Ticket')
        dispatch(fetchTicket(params.id))
        dispatch(fetchTicketReply(params.id))
        router.refresh()
        onOpenChange(close)
      } else {
        toast.error('Gagal membalas Ticket')
      }
    }
    else {
      const total = ticketReplyFilter.length + 1
      const res = await fetch(`/api/ticket/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: params.id,
          reply,
          solusi: total
        }),
      })
      if (res.ok) {
        toast.success('Berhasil membalas Ticket')
        dispatch(fetchTicket(params.id))
        dispatch(fetchTicketReply(params.id))
        router.refresh()
        onOpenChange(close)
      } else {
        toast.error('Gagal membalas Ticket')
      }
    }
  }

  const bukaTicket = async () => {
    const res = await fetch(`/api/ticket/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'Open'
      }),
    })
    if (res.ok) {
      toast.success('Berhasil membuka Ticket')
      dispatch(fetchTicket(params.id))
    }
  }

  const tutupTicket = async () => {
    const res = await fetch(`/api/ticket/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'Closed'
      }),
    })
    if (res.ok) {
      toast.success('Berhasil menutup Ticket')
      dispatch(fetchTicket(params.id))
    }
  }
  return (
    <>
      {ticket.status === 'Open' ?
        <div className='flex gap-2'>
          <Button onPress={onOpen} color='secondary' >Balas ticket</Button>
          <Button color='danger' variant='ghost' onClick={tutupTicket}>Tutup ticket</Button>
        </div>
        :
        <div className='flex gap-2'>
          <Button color='secondary' isDisabled>Balas ticket</Button>
          <Button color='danger' onClick={bukaTicket} >Buka ticket</Button>
        </div>
      }
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
        <ModalContent className='pt-5'>
          {(onClose) => (
            <form onSubmit={handleSubmitForm}>
              <ModalHeader className="flex flex-col gap-1">
                Balas tiket
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  {/* <Select
                    items={statuses}
                    labelPlacement='outside'
                    className="font-bold"
                    color='primary'
                    label="Status"
                    placeholder="Status"
                    variant="bordered"
                    id="status"
                    name="status"
                    // renderValue={akses}
                    selectedKeys={[status]}
                    onSelectionChange={(e) => {
                      // console.log(access[e.currentKey].label)
                      setStatus(e.currentKey);
                    }}
                  >
                    {(statuses) => <SelectItem>{statuses.label}</SelectItem>}
                  </Select> */}
                  <Textarea
                    labelPlacement='outside'
                    className="font-bold"
                    color='primary'
                    label="Deskripsi"
                    placeholder="Deskripsi"
                    variant="bordered"
                    name="deskripsi"
                    id="deskripsi"
                    onChange={(e) => setReply(e.target.value)}
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
