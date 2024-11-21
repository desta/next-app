"use client"
import React, { useEffect } from 'react'
import Balas from './Balas';
import TicketReply from './TicketReply';
import { fetchTicket } from '@/redux/slices/ticket';
import { useDispatch, useSelector } from 'react-redux';

export default function HalamanTicket({ params }) {
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.ticket.data);
  
  useEffect(() => {
    dispatch(fetchTicket(params.id));
  },[])
  
  return (
    <>
      <div className='border rounded-tl-medium rounded-tr-medium w-full'>
        <div className='bg-secondary text-secondary-foreground p-3 rounded-tl-medium rounded-tr-medium'>Deskripsi masalah:</div>
        <div className='p-3 rounded-bl-medium rounded-br-medium '>
          {params.deskripsi}
        </div>
      </div>
      <TicketReply params={params} />
      <div className='py-2'>
        <Balas params={params} />
      </div>
    </>
  )
}
