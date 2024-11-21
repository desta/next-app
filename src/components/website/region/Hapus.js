"use client"
import { useDispatch } from "react-redux";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import React from 'react'
import { toast } from 'react-hot-toast';
import { BiTrash } from 'react-icons/bi';
import { fetchRegions } from "@/redux/slices/website/Regions";

export default function Hapus({ params }) {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [region, setRegion] = React.useState(params.region);

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    // Add to your backend here
    const res = await fetch(`/api/website/region/${params.id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      toast.success('Berhasil hapus region')
      dispatch(fetchRegions())
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
              <ModalHeader className="flex flex-col gap-1">Hapus Region</ModalHeader>
              <ModalBody>
                <span>Yakit hapus region <span className="text-primary font-bold">{region}</span></span>
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
