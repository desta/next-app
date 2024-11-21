"use client"
import { useDispatch } from "react-redux";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import React from 'react'
import { toast } from 'react-hot-toast';
import { BiTrash } from 'react-icons/bi';
import { fetchProductTypes } from "@/redux/slices/product/ProductTypes";

export default function Hapus({ params }) {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [productType, setProductType] = React.useState(params.productType)

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    // Add to your backend here
    const res = await fetch(`/api/product_type/${params.id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      toast.success('Product type berhasil dihapus')
      onOpenChange(close)
      dispatch(fetchProductTypes())
    } else {
      toast.error('Product type gagal dihapus')
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
                <ModalHeader className="flex flex-col gap-1">Hapus product type</ModalHeader>
                <ModalBody>
                  <span>Yakit hapus product type <span className="text-primary font-bold">{productType}</span></span>
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
