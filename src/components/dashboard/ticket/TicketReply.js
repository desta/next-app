"use client"
import { fetchTicketReply } from '@/redux/slices/TicketReply'
import { fetchTicket } from '@/redux/slices/ticket'
import { Avatar } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function TicketReply({ params }) {
  const dispatch = useDispatch()
  var tgl = { year: 'numeric', month: 'short', day: 'numeric' };
  var jam = { hour: 'numeric', minute: 'numeric' };
  const ticket = useSelector(state => state.ticket.data)
  const ticketReply = useSelector(state => state.ticketreply.data)

  useEffect(() => {
    dispatch(fetchTicket(params.id))
    dispatch(fetchTicketReply(params.id))
  }, [])
console.log("reply",ticketReply)
  return (
    <>
      <div className='font-bold'>Balasan:</div>
      {
        ticketReply.length === 0 ? <div className='text-center'>Belum ada balasan untuk ticket ini.</div>
          :
          ticketReply.map((item, idx) => <div key={item.id}>
            <div className='border w-full mb-2'>
              <div className={`${ticket.userId === item.pemilikId ? 'bg-secondary' : 'bg-success'} text-secondary-foreground py-2 px-3`}>
                {ticket.userId !== item.pemilikId ? <span>Solusi {item.solusi}</span> : <span>Owner ticket</span>}
              </div>
              <div className='p-3 flex gap-2'>
                <div className='flex flex-col items-center'>
                  <Avatar src={item.user.image} color='primary' className='text-white' />
                  <p>{item.user.name}</p>
                  <p>{new Date(item.tanggal).toLocaleDateString("id-ID", tgl)}</p>
                </div>
                <div>
                  {item.reply}
                </div>
              </div>
            </div>
          </div>
          )
      }
    </>
  )
}
