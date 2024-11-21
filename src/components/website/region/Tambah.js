"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@nextui-org/react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchRegions } from '@/redux/slices/website/Regions';

export default function Tambah() {
  const dispatch = useDispatch()
  const [region, setRegion] = React.useState([])

  const handleSubmitForm = async (e) => {
    // Add to your backend here
    e.preventDefault()
    const res = await fetch('/api/website/region', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        region,
      }),
    })
    if (res.ok) {
      toast.success('Berhasil menambahkan region')
      dispatch(fetchRegions())
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
              <ModalHeader className="flex flex-col gap-1">Tambah Region</ModalHeader>
              <ModalBody>
                <Input
                  labelPlacement='outside'
                  className="font-bold"
                  color='primary'
                  label="Region"
                  placeholder="Region name"
                  variant="bordered"
                  name="region"
                  id="region"
                  onChange={(e) => setRegion(e.target.value)}
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
