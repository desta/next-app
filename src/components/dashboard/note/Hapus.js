"use client"
import { useDispatch } from "react-redux";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip } from "@nextui-org/react";
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { BiTrash, BiX } from 'react-icons/bi';
import { fetchNotes } from "@/redux/slices/notes";

export default function Hapus({ dataId }) {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    // Add to your backend here
    const res = await fetch(`/api/note/${dataId}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      toast.success('Hapus catatan berhasil')
      dispatch(fetchNotes())
    }
  }
  return (
    <>
      <Tooltip content="Hapus" color="danger">
        <div className="text-danger hover:text-red-500 hover:cursor-pointer" onClick={onOpen}><BiX size={24}/></div>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
        <form onSubmit={handleSubmitForm}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Hapus catatan</ModalHeader>
                <ModalBody>
                  <p>Yakit hapus catatan ini?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Keluar
                  </Button>
                  <Button type='submit' color="secondary">
                    Hapus
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}
