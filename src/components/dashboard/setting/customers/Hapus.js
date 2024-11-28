"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip } from "@nextui-org/react";
import { BiTrash } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { toast } from 'react-hot-toast';
import { fetchCustomers } from "@/redux/slices/customer/customers";

export default function Hapus({ params }) {
  const dispatch = useDispatch()
  const handleDelete = async () => {
    const res = await fetch(`/api/customer/${params.id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      dispatch(fetchCustomers())
      toast.success('Customer berhasil dihapus')
      onOpenChange(close)
    } else {
      toast.error('Customer gagal dihapus')
    }
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Tooltip color="danger" content="Hapus">
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <Button
            isIconOnly
            size="sm"
            variant="light"
            color="danger"
            aria-label="Edit"
            className="rounded-full"
            onPress={onOpen}
          >
            <BiTrash className="h-4 w-4" />
          </Button>
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Hapus customer</ModalHeader>
              <ModalBody>
                <p>Yakin menghapus customer <span className="font-bold">{params.pic}?</span></p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Keluar
                </Button>
                <Button onClick={handleDelete} color="danger">
                  Hapus
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
