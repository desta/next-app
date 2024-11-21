"use client"
import React from 'react'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react'

export default function FormFaq({ title, isOpen, onOpenChange, pertanyaan, setPertanyaan, jawaban, setJawaban, handleSubmitForm, handleSubmit, errors, register, reset }) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <Input
                  labelPlacement='outside'
                  color='primary'
                  label="Pertanyaan"
                  placeholder="Pertanyaan"
                  variant="bordered"
                  name="pertanyaan"
                  isInvalid={!!errors.pertanyaan}
                  errorMessage={errors.pertanyaan?.message}
                  {...register("pertanyaan")}
                  value={pertanyaan}
                  onValueChange={setPertanyaan}
                  className="font-bold border-primary"
                />
                <Textarea
                  labelPlacement='outside'
                  color='primary'
                  label="Jawaban"
                  placeholder="Jawaban"
                  variant="bordered"
                  name="jawaban"
                  isInvalid={!!errors.jawaban}
                  errorMessage={errors.jawaban?.message}
                  {...register("jawaban")}
                  value={jawaban}
                  onValueChange={setJawaban}
                  className="font-bold border-primary"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Keluar
                </Button>
                <Button type="submit" color="secondary">
                  Simpan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </form>
    </Modal>
  )
}
