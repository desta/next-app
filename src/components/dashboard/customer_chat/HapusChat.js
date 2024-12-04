'use client'
import { fetchCustomerChat } from "@/redux/slices/customer/CustomerChat";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { BiChat } from "react-icons/bi";
import { useDispatch } from "react-redux";

export default function HapusChat({ data, params, setDisplayReceiverNumber, setChat }) {
  const dispatch = useDispatch()

  const refresh = () => {
    if(data.length === 0){
      setDisplayReceiverNumber([])
    }
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setChat([]);
    const res = await fetch(`/api/customer_chat`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayReceiverNumber: params
      }),
    });
    if (res.ok) {
      toast.success("Hapus history chat berhasil");
      dispatch(fetchCustomerChat())
      refresh()
      onOpenChange(close);
    } else {
      toast.error("Hapus history chat gagal");
    }
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} radius="none" size="sm" className="bg-white flex justify-between" fullWidth>Hapus chat <BiChat size={14} /></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmitForm}>
              <ModalHeader className="flex flex-col gap-1">Hapus history chat </ModalHeader>
              <ModalBody>
                <p>Menghapus history chat akan otomatis menghapus nomor pengirim jika belum disimpan pada contact.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Tutup
                </Button>
                <Button type="submit" color="secondary" >
                  Hapus chat
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}