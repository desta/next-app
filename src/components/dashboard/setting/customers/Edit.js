"use client";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import { BiEdit, BiLock, BiUser } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "@/redux/slices/customer/customers";

export default function Edit({ params }) {
    const dispatch = useDispatch();
    const [perusahaan, setPerusahaan] = useState(params.perusahaan);
    const [pic, setPic] = useState(params.pic);
    const [alamat, setAlamat] = useState(params.alamat);
    const [nohp, setNohp] = useState(params.nohp);
    const [email, setEmail] = useState(params.email);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/customer/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({
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
            toast.success("Update customer berhasil");
            dispatch(fetchCustomers())
            onOpenChange(close);
        } else {
            toast.error("Update gagal");
        }
    };
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <Tooltip content="Update">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        aria-label="Update"
                        className="rounded-full"
                        onPress={onOpen}
                    >
                        <BiEdit className="h-4 w-4" />
                    </Button>
                </span>
            </Tooltip>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmitForm}>
                            <ModalBody className="block">
                                <p className="text-2xl font-bold">Update <span className="text-primary">customer</span></p>
                                <p className="text-xs pb-5">Isi form dibawah ini untuk update customer.</p>
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
                                        endContent={
                                            <MdAlternateEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
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
                                        endContent={
                                            <BiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
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
                                            <BiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
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
                                <div className="flex items-center justify-end gap-2 pt-5">
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button type="submit" color="secondary" className="max-w-sm">
                                        Update
                                    </Button>
                                </div>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
