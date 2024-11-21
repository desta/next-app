"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@nextui-org/react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { BiEdit } from 'react-icons/bi';
import { fetchProductTypes } from '@/redux/slices/product/ProductTypes';

export default function Edit({ params }) {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [productType, setProductType] = React.useState(params.productType);

  const handleSubmitForm = async (e) => {
    // Add to your backend here
    e.preventDefault();
    const res = await fetch(`/api/product_type/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productType
      }),
    })
    if (res.ok) {
      toast.success('Berhasil edit product type')
      dispatch(fetchProductTypes())
      onOpenChange(close)
    } else{
      toast.error('Gagal edit product type')
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
        className="rounded-full"
        onPress={onOpen}
      >
        <BiEdit className="h-4 w-4" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmitForm}>
              <ModalHeader className="flex flex-col gap-1">Edit product type</ModalHeader>
              <ModalBody>
                <Input
                  labelPlacement='outside'
                  className="font-bold"
                  color='primary'
                  label="Product type"
                  placeholder="Product type"
                  variant="bordered"
                  name="productType"
                  id="productType"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                />
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
