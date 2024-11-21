"use client"
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function BuatInvoice({ params }) {
    const session = useSession()
    const router = useRouter()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [po, setPo] = useState("");

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                po,
                createdBy: session.data.user.id,
                quotation: params.id,
            }),
        })
        if (res.ok) {
            router.refresh()
            toast.success('Berhasil membuat invoice')
            onOpenChange(close)
        } else {
            toast.error('Gagal membuat invoice')
        }
    }
    return (
        <>
            <Button onPress={onOpen} className="text-primary-button" size="sm" color="secondary">Buat invoice</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
                <ModalContent className='pt-5'>
                    {(onClose) => (
                        <form onSubmit={handleSubmitForm}>
                            <ModalHeader className="flex flex-col gap-1">
                                Buat invoice
                            </ModalHeader>
                            <ModalBody>
                                <p>Buat invoice dari quotation nomor <span className='font-bold text-primary'>{params.id}</span> berdasarkan nomor PO berikut:</p>
                                <div className="flex flex-col gap-2">
                                    <Input
                                        labelPlacement='outside-left'
                                        className="font-bold"
                                        color='primary'
                                        label="No PO"
                                        placeholder="No PO"
                                        variant="bordered"
                                        name="po"
                                        id="po"
                                        onChange={(e) => setPo(e.target.value)}
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
                            </ModalBody>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
