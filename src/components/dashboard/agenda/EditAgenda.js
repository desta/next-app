"use client"
import './Calendar.css';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem, Textarea, Tooltip, TimeInput, Spinner } from '@nextui-org/react'
import React, { useEffect, useState, useRef, useMemo, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { BiEdit } from 'react-icons/bi';
import { fetchAgendas } from '@/redux/slices/agendas';
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import("react-calendar"), {
    ssr: false, loading: () => <div className="flex gap-2 items-center"><Spinner size="sm" /><p>Loading...</p></div>,
  });
export default function EditAgenda({ params, dataContent, dataTanggal, dataJam }) {
    const dispatch = useDispatch()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [content, setContent] = useState(dataContent)
    const [tanggal, setTanggal] = useState(dataTanggal);
    const [jam, setJam] = useState({ hour: dataJam[0], minute: dataJam[1], second: dataJam[2], millisecond: dataJam[3] });

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/agenda/${params}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content,
                tanggal,
                jam,
            }),
        })
        if (res.ok) {
            toast.success('Berhasil edit agenda')
            dispatch(fetchAgendas())
        } else {
            toast.error('Gagal edit agenda')
        }
    }
    return (
        <>
            <Tooltip content="Edit">
                <div className='text-primary-500 cursor-pointer' onClick={onOpen}><BiEdit /></div>
            </Tooltip>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmitForm}>
                            <ModalHeader className="flex flex-col gap-1">Edit agenda</ModalHeader>
                            <ModalBody>
                                <div className='flex justify-center'>
                                    <Calendar onChange={setTanggal} />
                                </div>
                                <TimeInput label="Jam" labelPlacement="outside-left" value={jam} onChange={setJam} hourCycle={24} hideTimeZone />
                                <Textarea placeholder='Agenda' onChange={(e) => setContent(e.target.value)} value={content} radius='none' className='mt-1' />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Keluar
                                </Button>
                                <Button type='submit' color="secondary" onPress={onClose}>
                                    Simpan
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
