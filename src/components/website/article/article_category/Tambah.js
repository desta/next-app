"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@nextui-org/react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchArticleCategory } from '@/redux/slices/article/ArticleCategory';

export default function Tambah() {
  const dispatch = useDispatch()
  const [category, setCategory] = React.useState('')

  const handleSubmitForm = async (e) => {
    // Add to your backend here
    e.preventDefault()
    const res = await fetch('/api/article_category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
      }),
    })
    if (res.ok) {
      toast.success('Berhasil menambahkan category')
      dispatch(fetchArticleCategory())
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
              <ModalHeader className="flex flex-col gap-1">Tambah category</ModalHeader>
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
