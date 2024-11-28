'use client'
import { RiArrowUpDoubleFill } from "react-icons/ri";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import { FaLongArrowAltLeft } from "react-icons/fa";
import React from 'react'
import { Avatar, Button, Textarea } from "@nextui-org/react";
import { BiSend } from "react-icons/bi";

export default function Chat() {
    const [showChat, setShowChat] = React.useState(true)
    const [showMessage, setShowMessage] = React.useState(true)

    const handleClick = () => {
        showMessage(!showMessage)
    }

    return (
        <div className={`${showChat ? 'h-10' : 'h-1/2'} fixed bottom-0 left-1/2 -translate-x-1/2 w-full md:w-96 duration-400 ease-out z-50`}>
            <div className='w-full text-center -mb-7'>
                <button onClick={() => setShowChat(!showChat)} className='bg-primary text-white text-center p-2 h-20 w-20 text-2xl rounded-full' color='secondary'>{
                    showChat ?
                        <div className="animate-bounce flex justify-center mb-5"><RiArrowUpDoubleFill /></div> :
                        <div className="animate-bounce flex justify-center mb-3"><RiArrowDownDoubleFill /></div>}
                </button>
            </div>
            <div className={`${showChat ? '' : ''} bg-primary h-[calc(100%-50px)] w-full fixed rounded-md shadow-lg shadow-secondary/50 p-2`}>
                <div className="bg-white h-full w-full shadow-lg shadow-secondary/50 p-2 flex flex-col gap-2 overflow-y-auto">
                    <div onClick={() => setShowMessage(!showMessage)} className={`${showMessage ? 'block' : 'hidden'} flex items-center p-2 rounded-md hover:bg-primary-300 cursor-pointer`}>
                        <div className="w-12"><Avatar radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" /></div>
                        <div className='flex flex-col'>
                            <div className='font-bold'>biji</div>
                            <div className='text-gray-500 text-sm'>biji</div>
                        </div>
                    </div>
                    <div className={`${showMessage ? 'hidden' : 'block'} rounded-md`}>
                        <div className="flex flex-col justify-between">
                            <div>
                                <div className="flex items-center pb-3">
                                    <div className="text-2xl hover:cursor-pointer hover:text-primary-300" onClick={() => setShowMessage(!showMessage)}><FaLongArrowAltLeft /></div>
                                    <p className="w-full text-center font-bold text-primary">Biji</p>
                                </div>
                                <div className="h-[50%] overflow-y-auto">
                                    <div className="p-2 bg-primary-200 my-1 rounded-sm">Ini adalah pesan</div>
                                    <div className="p-2 bg-primary-200 my-1 rounded-sm">Ini adalah pesan</div>
                                    <div className="p-2 bg-primary-200 my-1 rounded-sm">Ini adalah pesan</div>
                                    <div className="p-2 bg-primary-200 my-1 rounded-sm">Ini adalah pesan</div>
                                    <div className="p-2 bg-primary-200 my-1 rounded-sm">Ini adalah pesan</div>
                                    <div className="p-2 bg-primary-200 my-1 rounded-sm">Ini adalah pesan</div>
                                    <div className="p-2 bg-primary-200 my-1 rounded-sm">Ini adalah pesan</div>
                                    <div className="p-2 bg-primary-200 my-1 rounded-sm">Ini adalah pesan</div>
                                    <div className="p-2 bg-primary-200 my-1 rounded-sm">Ini adalah pesan</div>
                                    <div className="p-2 bg-primary-200 my-1 rounded-sm">Ini adalah pesan</div>

                                </div>
                            </div>
                            <div className="flex gap-2 w-full">
                                <Textarea placeholder='Type here...' color='primary' radius='none' />
                                <Button type='submit' radius='none' isIconOnly className='bg-secondary text-secondary-foreground flex justify-center items-center text-xl hover:bg-primary-300 hover:text-primary'><BiSend /></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
