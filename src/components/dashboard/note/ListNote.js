'use client'
import React, { useEffect, useState } from 'react'

import { Button, Card, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Divider } from "@nextui-org/react";
import { BiEdit, BiTrash } from 'react-icons/bi';
import Tambah from './Tambah';
import Edit from './Edit';
import Hapus from './Hapus';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '@/redux/slices/notes';
import parser from 'html-react-parser';

export default function ListNote() {
    const dispatch = useDispatch()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [noteId, setNoteById] = useState('')
    const [index, setIndex] = useState(0)

    const notes = useSelector((state) => state.notes.data)

    useEffect(() => {
        dispatch(fetchNotes())
    }, [])

    const handleClick = (noteId, idx) => {
        setNoteById(noteId)
        setIndex(idx + 1)
    }

    return (
        <div className='text-sm lg:text-lg pb-2'>
            <div className='flex items-center gap-2 pb-2'>
                <p className='font-bold'>Catatan</p>
                <Tambah />
            </div>
            <Divider />
            <div className='py-2 w-full'>
                {notes.length !== 0 ?
                    <div className='flex flex-col md:flex-row md:flex-wrap gap-2 overflow-y-hidden'  >
                        {notes.map((item, idx) =>
                            <Card key={item.id}>
                                <CardBody>
                                    <div className='w-full md:w-80 h-28 md:h-32 text-base'>
                                        <div className='flex items-center justify-between gap-2'>
                                            <p>Catatan {idx + 1}</p>
                                            <div className='flex items-center'>
                                                <Edit dataId={item.id} dataNote={item.note} />
                                                <Hapus dataId={item.id} />
                                            </div>
                                        </div>
                                        <Divider className='pb-1' />
                                        <div className='pt-1 line-clamp-3 md:line-clamp-4 hover:cursor-pointer hover:m-2' onClick={() => { handleClick(item.id, idx), onOpen() }}>
                                            {parser(item.note)}
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        )}
                    </div>
                    :
                    <p className='text-center italic text-gray-500'>Belum ada catatan dibuat</p>
                }
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center' size='xl'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Catatan {index}</ModalHeader>
                            <ModalBody>
                                {notes.filter((item) => item.id === noteId).map((item, idx) =>
                                    <div key={idx}>
                                        {parser(item.note)}
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onPress={onClose}>
                                    Tutup
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}
