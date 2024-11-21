"use client"
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react'
import React from 'react'
import FormRegister from './FormRegister'

export default function Tambah() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} color='primary' className="text-primary-button">Tambah</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
        <ModalContent className='pt-5'>
          {(onClose) => (
            <>
              <ModalBody>
                <FormRegister onClose={onClose}/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
