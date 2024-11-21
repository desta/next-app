"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchProductCategories } from '@/redux/slices/product/ProductCategories';
import { fetchProductTypes } from '@/redux/slices/product/ProductTypes';
import { BiEdit } from 'react-icons/bi';

export default function Edit({ params }) {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [productType, setProductType] = React.useState(params.productType.id);
  const [category, setCategory] = React.useState(params.category);
  
  const productTypes = useSelector((state) => state.producttypes.data)
  
  const handleSelectionChange = (e) => {
    setProductType(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchProductTypes())
  }, [])

  const handleSubmitForm = async (e) => {
    // Add to your backend here
    e.preventDefault();
    const res = await fetch(`/api/product_category/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productType,
        category
      }),
    })
    if (res.ok) {
      toast.success('Berhasil edit category')
      onOpenChange(close)
      dispatch(fetchProductCategories())
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
                <Select
                  items={productTypes}
                  labelPlacement='outside'
                  className="font-bold max-w-xs"
                  color='primary'
                  label="Product type"
                  placeholder="Product type"
                  variant="bordered"
                  id="productType"
                  name="productType"
                  isRequired
                  selectedKeys={[productType]}
                  onSelectionChange={(e)=> setProductType(e.currentKey)}
                >
                  {(productTypes) => <SelectItem>{productTypes.productType}</SelectItem>}
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
