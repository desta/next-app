"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem, Textarea, Tooltip, Spinner } from '@nextui-org/react'
import React, { useEffect, useState, useRef, useMemo, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { BiEdit } from 'react-icons/bi';
import { fetchNotes } from '@/redux/slices/notes';
import { Editor } from '@/components/Editor';

export default function Edit({ dataId, dataNote }) {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [note, setNote] = useState(dataNote)

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/note/${dataId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        note
      }),
    })
    if (res.ok) {
      toast.success('Berhasil edit catatan')
      onOpenChange(close)
      dispatch(fetchNotes())
    } else {
      toast.error('Gagal edit catatan')
    }
  }
  return (
    <>
      <Tooltip content="Edit">
        <div className='hover:cursor-pointer' onClick={onOpen}><BiEdit /></div>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmitForm}>
              <ModalHeader className="flex flex-col gap-1">Edit catatan</ModalHeader>
              <ModalBody>
              <Editor value={note} onChange={setNote} />

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Keluar
                </Button>
                <Button type='submit' color="secondary" onPress={onClose}>
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
