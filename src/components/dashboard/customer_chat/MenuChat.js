'use client'
import React from 'react'
import HapusChat from './HapusChat'
import { Button } from '@nextui-org/react'
import { BiMenu } from 'react-icons/bi'
import TambahContact from './TambahContact'
import HapusContact from './HapusContact'
import EditContact from './EditContact'

export default function MenuChat({ customer, newCustomer, setDisplayReceiverNumber, chat, setChat }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="dropdown inline-block relative">
      <Button isIconOnly radius='none' color='secondary' onClick={() => setOpen(!open)}><BiMenu size={24} /></Button>
      <div className={`${open ? 'block' : 'hidden'} absolute right-0 p-2 bg-secondary flex flex-col gap-1`}>
        {customer.length === 0 ?
          <div className=""><TambahContact data={newCustomer} /></div>
          :
          <div className=""><EditContact data={customer} /></div>
        }
        {chat.length !== 0 && <div className="">
          <HapusChat data={customer} params={newCustomer} setDisplayReceiverNumber={setDisplayReceiverNumber} setChat={setChat} /></div>
        }
        {customer.length !== 0 && <div className="">
          <HapusContact data={customer} params={newCustomer} setDisplayReceiverNumber={setDisplayReceiverNumber} /></div>
        }
      </div>
    </div>
  )
}
