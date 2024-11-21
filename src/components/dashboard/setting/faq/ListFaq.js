"use client"
import { fetchFaq } from '@/redux/slices/faq'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Accordion, AccordionItem } from "@nextui-org/react";
export default function ListFaq() {
  const dispatch = useDispatch()
  const faqs = useSelector((state) => state.faq.data)

  useEffect(() => {
    dispatch(fetchFaq())
  }, [])

  return (
    <>
      <div className='text-2xl font-bold text-center'>Frequently <span className='text-primary'>Asked</span> Questions (FAQ)</div>
      <div className='text-gray-400 text-center pb-3'>Pertanyaan yang seting diajukan</div>
      <Accordion>
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} aria-label="Accordion 1" title={<span className='text-primary font-bold'>{faq.pertanyaan}</span>}>
            {faq.jawaban}
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}
