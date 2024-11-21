"use client"
import { useDispatch } from "react-redux";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip } from "@nextui-org/react";
import React from 'react'
import { toast } from 'react-hot-toast';
import { BiTrash } from 'react-icons/bi';
import { fetchPages } from "@/redux/slices/pages/Pages";

export default function Hapus({ params }) {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = React.useState(params.title);

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    // Add to your backend here
    const res = await fetch(`/api/pages/${params.id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      toast.success('Berhasil hapus page')
      dispatch(fetchPages())
    }
  }
  return (
    <>
     <Button
        isIconOnly
        size="sm"
        variant="light"
        color="default"
        aria-label="Edit"
        className="rounded-full text-red-500"
        onPress={onOpen}
      >
        <BiTrash className="h-4 w-4" />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <form onSubmit={handleSubmitForm}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Hapus page</ModalHeader>
                <ModalBody>
                  <span>Yakit hapus page <span className="text-primary font-bold">{title}</span></span>
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
