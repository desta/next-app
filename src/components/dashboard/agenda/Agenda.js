"use client"
import './Calendar.css';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAgendas } from '@/redux/slices/agendas';
import { Button, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Chip, TimeInput } from '@nextui-org/react'
import Calendar from 'react-calendar';
import { formatAgenda } from '@/components/Utils';
import { BiEdit, BiPlus, BiTrash } from 'react-icons/bi';
import EditAgenda from './EditAgenda';
import HapusAgenda from './HapusAgenda';
import { MdAccessTime } from "react-icons/md";
import { toast } from 'react-hot-toast';

export default function Agenda() {
    const dispatch = useDispatch()
    const today = new Date();
    const [show, setShow] = useState(false)
    const [tanggal, setTanggal] = useState(new Date());
    const [jam, setJam] = useState([]);
    const [content, setContent] = useState('')
    const agendas = useSelector((state) => state.Agenda.data)

    useEffect(() => {
        dispatch(fetchAgendas(tanggal))
    }, [tanggal])

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/agenda', {
            method: 'POST',
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
            toast.success('Berhasil menambahkan agenda')
            setContent('')
            dispatch(fetchAgendas())
        } else {
            toast.error('Gagal menambahkan agenda')
        }
    }
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (<>
        <div className='text-white flex items-center'>
            <Button onClick={() => setShow(show => !show)} isIconOnly radius='lg' variant='solid' color='secondary'>
                <div className='relative'>
                    <i className="bi bi-list text-2xl"></i>
                    {agendas.filter(x => {
                        return formatAgenda(x.tanggal) === formatAgenda(today)
                    }).length !== 0 && <div className='text-green-500 bg-green-500 absolute top-1 right-0 w-2 h-2 rounded-full animate-bounce' ></div>
                    }
                </div>
            </Button>
        </div>
        <div className={`${show ? 'w-[300px]' : 'w-0'} overflow-y-auto h-[calc(100vh-80px)] fixed bg-white rounded-s-lg shadow-lg right-0 top-20 z-40 transition-all duration-300`}>
            {/* <div className='flex justify-start'>
                
            </div> */}
            <div className='px-2 sticky top-0 bg-white z-40'>
                <div className='text-center font-bold text-primary flex justify-between items-center pt-2'>
                    <div onClick={() => setShow(show => !show)} className='hover:cursor-pointer'>
                        <i className="bi bi-x-lg text-primary text-xl"></i>
                    </div>
                    <p className='w-full'>Agenda</p>
                    <Button onPress={onOpen} isIconOnly size='sm' color='secondary'><BiPlus size={20} /></Button>
                </div>
                <Calendar onChange={setTanggal} tileClassName={({ date, view }) => {
                    if (agendas.find(x => formatAgenda(x.tanggal) === formatAgenda(date))) {
                        // return '!bg-secondary !text-secondary-foreground !rounded-medium !px-3 !rounded-full'
                        return 'highlight'
                    } else {
                        return ''
                    }
                }} />
            </div>
            <div className='p-2 text-sm lg:text-normal'>
                <div className='flex flex-col gap-1'>
                    {
                        agendas.filter(x => {
                            return formatAgenda(x.tanggal) === formatAgenda(tanggal)
                        }).length === 0 ?
                            <div className='p-1 bg-slate-100 text-center'><p className='italic'>Tidak ada agenda</p> <div onClick={onOpen} className='py-1 hover:cursor-pointer'><Chip size='sm' color='secondary'>Tambah agenda</Chip></div></div>
                            :
                            agendas.filter(x => formatAgenda(x.tanggal) === formatAgenda(tanggal)).map((item, index) => <div key={index} className='p-1 bg-slate-100'>
                                <p className='text-left text-base font-bold flex gap-1 items-center'><MdAccessTime />{item.hour === 0 ? '00' : item.hour}:{item.minute === 0 ? '00' : item.minute}</p>
                                <p className='text-left'>{item.content}</p>
                                <div className='flex justify-end gap-1 pt-1'>
                                    <EditAgenda params={item.id} dataContent={item.content} dataTanggal={item.tanggal} dataJam={[item.hour, item.minute, item.second, item.millisecond]} />
                                    <HapusAgenda params={item.id} />
                                </div>
                            </div>)
                    }
                </div>
            </div>
        </div>
        {/* Modal tambah agenda */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleSubmitForm}>
                        <ModalHeader className="flex flex-col gap-1">Tambah agenda</ModalHeader>
                        <ModalBody>
                            <div className='flex justify-center'>
                                <Calendar onChange={setTanggal} value={tanggal} />
                            </div>
                            <TimeInput label="Jam" labelPlacement="outside-left" value={jam} onChange={setJam} hourCycle={24} hideTimeZone />
                            <Textarea placeholder='Agenda' onChange={(e) => setContent(e.target.value)} value={content} radius='none' className='mt-1' isRequired />
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
