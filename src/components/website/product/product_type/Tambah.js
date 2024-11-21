"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@nextui-org/react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchProductTypes } from '@/redux/slices/product/ProductTypes';

export default function Tambah() {
  const dispatch = useDispatch()
  const [productType, setProductType] = React.useState('')
 
  const handleSubmitForm = async (e) => {
    // Add to your backend here
    e.preventDefault()
    const res = await fetch('/api/product_type', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productType,
      }),
    })
    if (res.ok) {
      toast.success('Berhasil menambahkan category')
      dispatch(fetchProductTypes())
      onOpenChange(close)
    }
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} color='primary' className="text-primary-button">Tambah</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmitForm}>
              <ModalHeader className="flex flex-col gap-1">Tambah product type</ModalHeader>
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
                  onChange={(e) => setProductType(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Keluar
                </Button>
                <Button type='submit' color="secondary">
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
