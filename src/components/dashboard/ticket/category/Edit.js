"use client";
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input, Tooltip, Select, SelectItem, user, Tabs, Tab, Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Switch } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import { BiEdit, BiUser } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { fetchTicketCategory } from "@/redux/slices/TicketCategory";

export default function Edit({ params }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [category, setCategory] = useState(params.category);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/ticket/category/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        category,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.ok) {
      dispatch(fetchTicketCategory())
      toast.success('Category ticket berhasil diubah')
      onOpenChange(close)
    } else {
      toast.error('Category ticket gagal diubah')
    }

  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Tooltip content="Ubah">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
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
        </span>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit category ticket
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmitForm}>
                  <div className="flex flex-col gap-2">
                    <Input
                      endContent={
                        <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      labelPlacement='outside'
                      className="font-bold"
                      color='primary'
                      label="Category"
                      placeholder="Category"
                      variant="bordered"
                      name="category"
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-5">
                    <Button
                      color="danger"
                      variant="light"
                      onClick={() => {
                        onClose();
                      }}
                    >
                      Tutup
                    </Button>
                    <Button type="submit" color="secondary" className="max-w-sm">
                      Simpan
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}