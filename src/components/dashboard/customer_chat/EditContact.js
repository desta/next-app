'use client'
import { fetchCustomers } from "@/redux/slices/customer/customers";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BiEdit, BiPhone, BiUser } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { useDispatch } from "react-redux";

export default function EditContact({ data }) {
  console.log('d',data)
  const dispatch = useDispatch()
  const [perusahaan, setPerusahaan] = useState(data[0].perusahaan);
  const [pic, setPic] = useState(data[0].pic);
  const [alamat, setAlamat] = useState(data[0].alamat);
  const [nohp, setNohp] = useState(data[0].nohp);
  const [email, setEmail] = useState(data[0].email);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/customer/${data[0].id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: data[0].id,
        perusahaan,
        pic,
        alamat,
        nohp,
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      toast.success("Edit contact berhasil");
      dispatch(fetchCustomers())
      setPerusahaan("");
      setPic("");
      setAlamat("");
      setNohp("");
      setEmail("");
      onOpenChange(close);
    } else {
      toast.error("Edit gagal");
    }
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} radius="none" size="sm" className="bg-white flex justify-between" fullWidth>Edit contact <BiEdit size={14} /></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmitForm}>
              <ModalHeader className="flex flex-col gap-1">Edit contact customer </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <Input
                    endContent={
                      <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    labelPlacement='outside'
                    className="font-bold"
                    color='primary'
                    label="Perusahaan"
                    placeholder="Nama perusahaan atau personal"
                    variant="bordered"
                    name="perusahaan"
                    id="perusahaan"
                    value={perusahaan}
                    onValueChange={setPerusahaan}
                  />
                  <Input
                    endContent={
                      <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    labelPlacement='outside'
                    className="font-bold"
                    color='primary'
                    label="PIC"
                    placeholder="PIC perusahaan"
                    variant="bordered"
                    name="pic"
                    id="pic"
                    value={pic}
                    onValueChange={setPic}
                  />
                  <Textarea
                    labelPlacement='outside'
                    className="font-bold"
                    color='primary'
                    label="Alamat"
                    placeholder="Alamat perusahaan atau personal"
                    variant="bordered"
                    name="alamat"
                    id="alamat"
                    value={alamat}
                    onValueChange={setAlamat}
                  />
                  <Input
                    isReadOnly
                    endContent={
                      <BiPhone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    labelPlacement='outside'
                    className="font-bold"
                    color='primary'
                    label="No Handphone"
                    placeholder="No handphone PIC"
                    variant="bordered"
                    name="nohp"
                    id="nohp"
                    value={nohp}
                    onValueChange={setNohp}
                  />
                  <Input
                    endContent={
                      <MdEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    labelPlacement='outside'
                    className="font-bold"
                    color='primary'
                    label="Email"
                    placeholder="Email PIC"
                    variant="bordered"
                    name="email"
                    id="email"
                    value={email}
                    onValueChange={setEmail}
                  />
                </div>
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