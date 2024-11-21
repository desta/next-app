"use client"
import { fetchMikrotikData } from '@/redux/slices/MikrotikData';
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'
import React, { useState } from 'react'
import { BiUser } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';

export default function AddMikrotik() {
    const dispatch = useDispatch()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [ip, setIp] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        const res = await fetch('/api/mikrotik/data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ip,
              username,
              password
            }),
          })
          if(res.ok) {
            toast.success('Berhasil menambahkan Mikrotik')
            dispatch(fetchMikrotikData())
            onOpenChange(close)
          }
    }
    return (
        <>
            <Button onPress={onOpen} color='primary' className="text-primary-button">Tambah</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
                <ModalContent className='pt-5'>
                    {(onClose) => (
                        <form onSubmit={handleSubmitForm}>
                            <ModalHeader className="flex flex-col gap-1">Tambah Mikrotik</ModalHeader>
                            <ModalBody>
                                <Input
                                    endContent={
                                        <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    labelPlacement='outside'
                                    className="font-bold"
                                    color='primary'
                                    label="IP"
                                    placeholder="IP"
                                    variant="bordered"
                                    name="ip"
                                    id="ip"
                                    onChange={(e) => setIp(e.target.value)}
                                />
                                <Input
                                    endContent={
                                        <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    labelPlacement='outside'
                                    className="font-bold"
                                    color='primary'
                                    label="Username"
                                    placeholder="Username"
                                    variant="bordered"
                                    name="username"
                                    id="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <Input
                                    endContent={
                                        <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    labelPlacement='outside'
                                    className="font-bold"
                                    color='primary'
                                    label="Password"
                                    placeholder="Password"
                                    variant="bordered"
                                    name="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="flex items-center justify-end gap-2 pt-5">
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Tutup
                                    </Button>
                                    <Button type="submit" color="secondary" className="max-w-sm">
                                        Tambah
                                    </Button>
                                </div>
                            </ModalBody>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
