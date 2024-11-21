"use client"
import { useDispatch } from "react-redux";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import React from 'react'
import { toast } from 'react-hot-toast';
import { BiTrash } from 'react-icons/bi';
import { fetchPagesCategory } from "@/redux/slices/pages/PagesCategory";

export default function Hapus({ params }) {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [category, setCategory] = React.useState(params.category);

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    // Add to your backend here
    const res = await fetch(`/api/pages_category/${params.id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      toast.success('Berhasil hapus category')
      dispatch(fetchPagesCategory())
    } else {
      toast.error('Gagal hapus category')
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
              <ModalHeader className="flex flex-col gap-1">Hapus category</ModalHeader>
              <ModalBody>
                <span>Yakit hapus category <span className="text-primary font-bold">{category}</span></span>
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
