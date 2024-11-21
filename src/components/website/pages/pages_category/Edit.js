"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchProductTypes } from '@/redux/slices/product/ProductTypes';
import { BiEdit } from 'react-icons/bi';
import { fetchPagesCategory } from '@/redux/slices/pages/PagesCategory';

export default function Edit({ params }) {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [category, setCategory] = React.useState(params.category);
  
  const productTypes = useSelector((state) => state.producttypes.data)
  
  useEffect(() => {
    dispatch(fetchProductTypes())
  }, [])

  const handleSubmitForm = async (e) => {
    // Add to your backend here
    e.preventDefault();
    const res = await fetch(`/api/pages_category/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category
      }),
    })
    if (res.ok) {
      toast.success('Berhasil edit category')
      onOpenChange(close)
      dispatch(fetchPagesCategory())
    } else {
      toast.error('Gagal edit category')
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
              <ModalHeader className="flex flex-col gap-1">Edit category</ModalHeader>
              <ModalBody>
                <Input
                  labelPlacement='outside'
                  className="font-bold"
                  color='primary'
                  label="Category"
                  placeholder="Category name"
                  variant="bordered"
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
