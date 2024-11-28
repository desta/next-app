'use client'
import { fetchCustomerChat, tambah } from '@/redux/slices/customer/CustomerChat'
import { fetchCustomers } from '@/redux/slices/customer/customers'
import { Avatar, Button, Input, Textarea, Tabs, Tab, Card, CardBody } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { BiSend } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'

export default function SidebarChat() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [chat, setChat] = React.useState([])
    const [message, setMessage] = React.useState('')
    const [customer, setCustomer] = React.useState([])

    const listCustomer = useSelector(state => state.customers.data)
    const dataChat = useSelector(state => state.customerChat.data)

    useEffect(() => {
        dispatch(fetchCustomers())
        dispatch(fetchCustomerChat())
    }, [])

    const filter = dataChat.filter((book, index, array) => {
        const bookIndex = array.findIndex((b) => book.customerId === b.customerId);
        return index === bookIndex;
    })
    console.log('filter', customer)
    const handleSelect = (data) => {
        setCustomer(listCustomer.filter(item => item.id === data.id))
        setChat(dataChat.filter(item => item.customerId === data.id))
        setMessage('')
    }

    const onSelectionChange = () => {
        setCustomer([])
        setChat([])
        setMessage('')
    }

    const handleNewChat = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/customer_chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                customer: customer[0].id,
            }),
        })
        if (res.ok) {
            toast.success('Berhasil mengirim chat')
            setMessage('')
            dispatch(fetchCustomerChat())
            handleSelect(customer[0])
        } else {
            toast.error('Gagal mengirim chat')
        }
    }

    return (
        <>
            <div className='flex gap-4'>
                <div className='w-64'>
                    <div className='w-64 bg-white h-14 flex items-center justify-center p-2'>
                        <Input isClearable placeholder="Search or start new chat" color='primary' className='w-full' />
                    </div>
                    <div className='w-64 h-[calc(100vh-250px)] overflow-y-auto p-2 bg-white'>
                        <Tabs aria-label="Options" fullWidth color='secondary' onSelectionChange={onSelectionChange}>
                            <Tab key="history" title="History">
                                {filter.length === 0 ? <span className='text-center text-gray-400 italic block'>Tidak ada history.</span>
                                    :
                                    filter.map((data, index) =>
                                        <div onClick={() => handleSelect(data)} className='flex flex-col gap-2' key={index}>
                                            <div className={`${data.customer.nohp === customer[0]?.nohp ? 'bg-primary-100' : ''} flex flex-row gap-4 items-center p-2 hover:bg-primary-100 hover:text-black cursor-pointer`}>
                                                <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                                <div className='flex flex-col'>
                                                    <div className='font-bold'>{data.customer.pic === '' ? data.customer.nohp : data.customer.pic}</div>
                                                    <div className='text-gray-500 text-sm'>{data.message}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </Tab>
                            <Tab key="contact" title="Contact">
                                {listCustomer.length === 0 ? <span className='text-center text-gray-400 italic block'>Tidak ada contact.</span>
                                    :
                                    listCustomer.map(data =>
                                        <div onClick={() => handleSelect(data)} className='flex flex-col gap-2' key={data.id}>
                                            <div className={`${data.nohp === customer[0]?.nohp ? 'bg-primary-100' : ''} flex flex-row gap-4 items-center p-2 hover:bg-primary-100 hover:text-black cursor-pointer`}>
                                                <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                                <div className='flex flex-col'>
                                                    <div className='font-bold'>{data.pic === '' ? data.nohp : data.pic}</div>
                                                    <div className='text-gray-500 text-sm'>{data.perusahaan}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                            </Tab>
                        </Tabs>

                    </div>
                </div>
                <div className='flex-1'>
                    {customer.length === 0 ? 'biji'
                        :
                        <>
                            <div className='bg-white h-14 flex items-center justify-center p-2 font-bold text-lg'>
                                {customer[0]?.pic === '' ? customer[0].nohp : customer[0]?.pic}
                            </div>
                            <div className='h-[calc(100vh-341px)] overflow-y-auto pr-2 flex flex-col'>
                                {chat.map((x, index) => x.sender === customer[0].nohp ?
                                    <div className='flex mt-1 mb-1 w-fit' key={index}>
                                        <div className='w-12'>
                                            <Avatar radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                        </div>
                                        <div className='bg-white p-2 rounded-lg leading-tight'>
                                            {x.message}
                                        </div>
                                    </div>
                                    :
                                    <div className='block' key={index}>
                                        <div className='p-2 rounded-lg mt-1 mb-1 bg-secondary text-secondary-foreground w-fit leading-tight float-right'>
                                            {x.message}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <form onSubmit={handleNewChat} className='flex gap-2 items-center bg-white p-2'>
                                <Textarea placeholder='Type here...' color='primary' radius='none' onChange={(e) => setMessage(e.target.value)} value={message} />
                                <Button type='submit' radius='none' className='bg-secondary text-secondary-foreground h-[75px] w-20 flex justify-center items-center text-xl hover:bg-primary-300 hover:text-primary'><BiSend /></Button>
                            </form>
                        </>
                    }
                </div>
            </div>
        </>
    )
}
