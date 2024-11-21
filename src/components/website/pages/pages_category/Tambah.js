"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchProductCategories } from '@/redux/slices/product/ProductCategories';
import { getResponseData } from '@/utils/getResponseData';
import { fetchPagesCategory } from '@/redux/slices/pages/PagesCategory';

export default function Tambah() {
  const dispatch = useDispatch()
  const [category, setCategory] = React.useState('')

  useEffect(() => {
    dispatch(fetchPagesCategory())
  },[])

  const handleSubmitForm = async (e) => {
    // Add to your backend here
    e.preventDefault()
    const res = await fetch('/api/pages_category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
      }),
    })

    const responseResult = await getResponseData(res);

    if (res.ok) {
      toast.success(`Berhasil menambahkan category : ${responseResult.response.category}`)
      dispatch(fetchPagesCategory())
      onOpenChange(close)
    } else{
      toast.error(responseResult.response)
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
              <ModalHeader className="flex flex-col gap-1">Tambah category pages</ModalHeader>
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
                  onChange={(e) => setCategory(e.target.value)}
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
