"use client"
import './Calendar.css';
import Calendar from 'react-calendar';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem, Textarea, Tooltip } from '@nextui-org/react'
import React, { useEffect, useState, useRef, useMemo, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { fetchNotes } from '@/redux/slices/notes';
import { fetchAgendas } from '@/redux/slices/agendas';

export default function HapusAgenda({ params, dataContent, dataTanggal }) {
    const dispatch = useDispatch()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [content, setContent] = useState(dataContent)
    const [tanggal, setTanggal] = useState(dataTanggal);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/agenda/${params}`, {
            method: 'DELETE',
        })
        if (res.ok) {
            toast.success('Berhasil hapus agenda')
            dispatch(fetchAgendas())
        } else {
            toast.error('Gagal hapus agenda')
        }
    }
    return (
        <>
            <Tooltip content="Hapus">
                <div className='text-danger-500 cursor-pointer' onClick={onOpen}><BiTrash /></div>
            </Tooltip>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmitForm}>
                            <ModalHeader className="flex flex-col gap-1">Hapus agenda</ModalHeader>
                            <ModalBody>
                                <p>Yakit hapus agenda ini?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Keluar
                                </Button>
                                <Button type='submit' color="secondary" onPress={onClose}>
                                    Hapus
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
