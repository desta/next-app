"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@nextui-org/react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchRegions } from '@/redux/slices/website/Regions';
import { BiEdit } from 'react-icons/bi';

export default function Edit({ params }) {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [region, setRegion] = React.useState(params.region);

  const handleSubmitForm = async (e) => {
    // Add to your backend here
    e.preventDefault();
    const res = await fetch(`/api/website/region/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        region
      }),
    })
    if (res.ok) {
      toast.success('Berhasil edit region')
      onOpenChange(close)
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
        className="rounded-full"
        onPress={onOpen}
      >
        <BiEdit className="h-4 w-4" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmitForm}>
              <ModalHeader className="flex flex-col gap-1">Edit Region</ModalHeader>
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
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
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
