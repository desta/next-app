"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchProductCategories } from '@/redux/slices/product/ProductCategories';
import { fetchProductTypes } from '@/redux/slices/product/ProductTypes';
import { getResponseData } from '@/utils/getResponseData';

export default function Tambah() {
  const dispatch = useDispatch()
  const [category, setCategory] = React.useState('')
  const [productType, setProductType] = React.useState('')

  const productTypes = useSelector((state) => state.producttypes.data)

  useEffect(() => {
    dispatch(fetchProductTypes())
  },[])

  const handleSubmitForm = async (e) => {
    // Add to your backend here
    e.preventDefault()
    const res = await fetch('/api/product_category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
        productType,
      }),
    })

    const responseResult = await getResponseData(res);

    if (res.ok) {
      toast.success(`Berhasil menambahkan category : ${responseResult.response.category}`)
      dispatch(fetchProductCategories())
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
              <ModalHeader className="flex flex-col gap-1">Tambah category product</ModalHeader>
              <ModalBody>
              <Select
                  labelPlacement='outside'
                  className="font-bold max-w-xs"
                  color='primary'
                  label="Product type"
                  placeholder="Product type"
                  variant="bordered"
                  id="productType"
                  name="productType"
                  isRequired
                  onChange={(e) => setProductType(e.target.value)}
                >
                  {productTypes.map((item) => (
                    <SelectItem key={item.id}>
                      {item.productType}
                    </SelectItem>
                  ))}
                </Select>
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
