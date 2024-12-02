'use client'
import { fetchCustomerChat } from '@/redux/slices/customer/CustomerChat'
import { fetchCustomers } from '@/redux/slices/customer/customers'
import { Avatar, Button, Input, Textarea, Tabs, Tab, } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { BiSend } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import MenuChat from './MenuChat'
import { formatJam, formatTanggalShort } from '@/components/Utils'

export default function CustomerChat() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [chat, setChat] = React.useState([])
    const [displayReceiverNumber, setDisplayReceiverNumber] = React.useState('')
    const [messageBody, setMessageBody] = React.useState('')
    const [customer, setCustomer] = React.useState([])
    const [createdAt, setCreatedAt] = React.useState(new Date())

    const listCustomer = useSelector(state => state.customers.data)
    const dataChat = useSelector(state => state.customerChat.data)

    const today = new Date()

    useEffect(() => {
        dispatch(fetchCustomers())
        dispatch(fetchCustomerChat())
    }, [])

    const filter = dataChat.filter((book, index, array) => {
        const chatIndex = array.findIndex((b) => book.displayReceiverNumber === b.displayReceiverNumber);
        return index === chatIndex;
    })

    const handleHistory = (data) => {
        setCustomer(listCustomer.filter(item => item.nohp === data.displayReceiverNumber))
        setChat(dataChat.filter(item => item.displayReceiverNumber === data.displayReceiverNumber))
        setDisplayReceiverNumber(data.displayReceiverNumber)
        setMessageBody('')
    }

    const handleContact = (data) => {
        setCustomer(listCustomer.filter(item => item.id === data.id))
        setChat(dataChat.filter(item => item.displayReceiverNumber === data.nohp))
        setDisplayReceiverNumber(data.nohp)
        setMessageBody('')
    }

    const onSelectionChange = () => {
        setCustomer([])
        setChat([])
        setMessageBody('')
        setDisplayReceiverNumber([])
    }

    const handleNewChat = async (e) => {
        e.preventDefault()
        if (messageBody === '') {
            toast.error('Please enter a message')
        } else {
            setChat(dataLama => [...dataLama, { messageBody, createdAt }])
            const res = await fetch('/api/customer_chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    displayReceiverNumber,
                    messageBody,
                    customer,
                }),
            })
            if (res.ok) {
                toast.success('Berhasil mengirim chat')
                setMessageBody('')
                dispatch(fetchCustomerChat())
                router.push('#chat')
            } else {
                toast.error('Gagal mengirim chat')
            }
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
                                        <a href='#chat' key={index}>
                                            <div onClick={() => handleHistory(data)} className='flex flex-col gap-2' >
                                                <div className={`${data.displayReceiverNumber === displayReceiverNumber ? 'bg-primary-100' : ''} flex flex-row gap-4 items-center p-2 hover:bg-primary-100 hover:text-black cursor-pointer`}>
                                                    <div><Avatar isBordered src="" showFallback size='md' color='secondary' /></div>
                                                    <div className='flex flex-col'>
                                                        <div className='font-bold line-clamp-1'>{dataChat.filter(item => item.displayReceiverNumber === data.displayReceiverNumber).slice(-1)[0]?.displayReceiverNumber === listCustomer.filter(item => item.nohp === data.displayReceiverNumber).slice(-1)[0]?.nohp ?
                                                            listCustomer.filter(item => item.nohp === data.displayReceiverNumber).slice(-1)[0]?.pic :
                                                            dataChat.filter(item => item.displayReceiverNumber === data.displayReceiverNumber).slice(-1)[0]?.displayReceiverNumber}</div>
                                                        <div className='text-gray-500 text-sm line-clamp-1'>{dataChat.filter(item => item.displayReceiverNumber === data.displayReceiverNumber).slice(-1)[0]?.messageBody}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    )
                                }
                            </Tab>
                            <Tab key="contact" title="Contact">
                                {listCustomer.length === 0 ? <span className='text-center text-gray-400 italic block'>Tidak ada contact.</span>
                                    :
                                    listCustomer.map(data =>
                                        <a href='#chat' key={data.id}>
                                            <div onClick={() => handleContact(data)} className='flex flex-col gap-2' >
                                                <div className={`${data.nohp === customer[0]?.nohp ? 'bg-primary-100' : ''} flex flex-row gap-4 items-center p-2 hover:bg-primary-100 hover:text-black cursor-pointer`}>
                                                    <div><Avatar isBordered src="" showFallback size='md' color='secondary' /></div>
                                                    <div className='flex flex-col'>
                                                        <div className='font-bold line-clamp-1'>{data.pic === '' ? data.nohp : data.pic}</div>
                                                        <div className='text-gray-500 text-sm line-clamp-1'>{data.perusahaan}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    )}
                            </Tab>
                        </Tabs>

                    </div>
                </div>
                <div className='flex-1'>
                    {displayReceiverNumber.length === 0 ? null
                        :
                        <>
                            <div className='bg-white h-14 flex items-center justify-center p-2 font-bold text-lg'>
                                <div className='w-full text-center'>
                                    {displayReceiverNumber === customer[0]?.nohp ? customer[0]?.pic : displayReceiverNumber}
                                </div>
                                <MenuChat customer={customer} newCustomer={displayReceiverNumber} />
                            </div>
                            <div className='flex flex-col h-[calc(100vh-250px)] gap-2 overflow-y-auto'>
                                <div className="flex flex-col gap-1 overflow-y-auto flex-grow pr-1 pt-2">
                                    {chat.map((x, index) => x.userId === null ?
                                        <div className='flex gap-2 mt-1 mb-1 max-w-[70%]' key={index}>
                                            <div className='pl-1'>
                                                <Avatar isBordered src="" showFallback size='md' color='secondary' />
                                            </div>
                                            <div className='leading-tight '>
                                                <div className='p-2 rounded-lg bg-secondary text-secondary-foreground'>{x.messageBody}</div>
                                                <div className='text-xs text-gray-400 text-right'>{formatTanggalShort(today) === formatTanggalShort(x.createdAt) ? formatJam(x.createdAt) : formatTanggalShort(x.createdAt)}</div>
                                            </div>
                                        </div>
                                        :
                                        <div key={index} className='mt-1 mb-1 leading-tight max-w-[70%] self-end'>
                                            <div className='bg-white p-2 rounded-lg'>{x.messageBody}</div>
                                            <div className='text-xs text-gray-400 text-right'>{formatTanggalShort(today) === formatTanggalShort(x.createdAt) ? formatJam(x.createdAt) : formatTanggalShort(x.createdAt)}</div>
                                        </div>
                                    )}
                                    <div id='chat'></div>
                                </div>
                                <form onSubmit={handleNewChat} className='flex gap-2 bg-white p-2'>
                                    <Textarea onKeyDown={(e) => { if (e.key === "Enter") handleNewChat(e) }} minRows={1} placeholder='Type here...' color='primary' radius='none' onChange={(e) => setMessageBody(e.target.value)} value={messageBody} />
                                    <Button type='submit' radius='none' isIconOnly className='bg-secondary text-secondary-foreground flex justify-center items-center text-xl hover:bg-black hover:text-primary'><BiSend /></Button>
                                </form>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}
