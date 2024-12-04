'use client'
import { fetchCustomerChat } from "@/redux/slices/customer/CustomerChat";
import { fetchCustomers } from "@/redux/slices/customer/customers";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { useDispatch } from "react-redux";

export default function HapusContact({ data, params, setDisplayReceiverNumber }) {
  const dispatch = useDispatch()
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/customer/${data[0].id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayReceiverNumber: params
      }),
    });
    if (res.ok) {
      toast.success("Hapus contact berhasil");
      dispatch(fetchCustomers())
      dispatch(fetchCustomerChat())
      onOpenChange(close);
      setDisplayReceiverNumber([])
    } else {
      toast.error("Hapus contact gagal");
    }
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} radius="none" size="sm" className="flex justify-between" color="danger" fullWidth>Hapus contact <BiTrash size={14} /></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmitForm}>
              <ModalHeader className="flex flex-col gap-1">Hapus contact customer </ModalHeader>
              <ModalBody>
                <p>Apakah anda yakin ingin menghapus contact customer ini?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Tutup
                </Button>
                <Button type="submit" color="secondary" >
                  Simpan
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}