"use client"
import { useReactToPrint } from 'react-to-print';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Divider, Button } from '@nextui-org/react'
import React, { useRef } from 'react'
import Link from 'next/link';
import BuatInvoice from '../invoice/BuatInvoice';
import { formatTanggal } from '@/components/Utils';
import { usePathname } from "next/navigation";

export default function ListQuotation({ params }) {

  const ActiveMenuLink = ({ children, href }) => {
    const pathname = usePathname();
    const active = href === pathname;
    return (
      <>
        <Link href={href}>
          {children}
        </Link>
      </>
    );
  };

  let subTotal = 0
  console.log('par', params)

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: `QUOT${params.id}`,
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  return (
    <>
      <div className='flex justify-end items-center gap-2'>
        <Button size="sm" color="secondary" onClick={() => { handlePrint(null, () => contentToPrint.current); }}>Print</Button>
        {params.invoice.length === 0 ?
          <BuatInvoice params={params} />
          :
          <ActiveMenuLink href={`/dashboard/sales_invoice/inv${params.id}?id=${params.id}`}><Button size="sm" color="secondary">Invoice</Button></ActiveMenuLink>
        }
      </div>
      <div ref={contentToPrint} className="area-print" media="print">
        <h1 className='text-2xl font-bold'>Quotation</h1>
        <div className='flex justify-between items-center'>
          <div>
            <p>To: {params.customer?.pic}</p>
            <p>Address: {params.customer?.alamat} </p>
          </div>
          <div>
            <p>From: {params.sales?.name}</p>
            <p>Date: {formatTanggal(params.tanggal)} </p>
            <p>No. Quotation: QUOT{params.id} </p>
          </div>
        </div>
        <br></br>
        <p>Dear Mr/Ms. <span className='font-bold'>{params.customer?.pic}</span></p>
        <p>Thank you for your interest in our products and services. We are pleased to provide you with a quotation for the following items:</p>

        <Table aria-label="Tabel items quotation" removeWrapper isStriped className='py-3'>
          <TableHeader>
            <TableColumn className='bg-secondary text-secondary-foreground hover:text-secondary-foreground'>Item</TableColumn>
            <TableColumn className='bg-secondary text-secondary-foreground hover:text-secondary-foreground w-[100px]'>Qty</TableColumn>
            <TableColumn className='bg-secondary text-secondary-foreground hover:text-secondary-foreground text-center'>Price</TableColumn>
            <TableColumn className='bg-secondary text-secondary-foreground hover:text-secondary-foreground text-center'>Total</TableColumn>
          </TableHeader>
          <TableBody>
            {
              params.items?.map((val, i) => {
                subTotal = subTotal + val.total
                return (
                  <TableRow key={i}>
                    <TableCell>{val.item}</TableCell>
                    <TableCell>{val.qty}</TableCell>
                    <TableCell><div className='flex justify-between'><span >Rp.</span><span>{val.harga.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</span></div></TableCell>
                    <TableCell><div className='flex justify-between'><span >Rp.</span><span>{val.total.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</span></div></TableCell>
                  </TableRow>
                )
              }
              )
            }
            <TableRow key="44">
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className='font-bold text-right'>Sub total</TableCell>
              <TableCell><div className='flex justify-between font-bold'><span >Rp.</span><span>{subTotal.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</span></div></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br></br>
        <p className='font-bold'>Terms & Conditions</p>
        <p className='pl-5'>▪ Price subject to change without prior notice or Price valid until 29 Aug , 2024</p>
        <p className='pl-5'>▪ The quotation grand total is include PPN and exclude any others tax. We will receive the same value stated at our invoice</p>
        <p className='pl-5'>▪ PO can not be Cancelled.</p>
        <p className='pl-5'>▪ Delivery Time   : Indent 2 - 4 weeks</p>
        <p className='pl-5'>▪ Term of Payment : 14 Days After Invoice and full amount</p>
        <p className='pl-5'>▪ The invoice should be paid within the due date. Payment made after the due date; interest will be charged at a rate 1 ‰ per day</p>
        <p className='pl-5'>▪ Delivery will be made to the address stated in the Purchase Order</p>
        <p className='pl-5'>▪ Delivery will be made by our own truck</p>
        <p className='pl-5'>▪ The goods will be delivered to the address stated in the Purchase Order</p>
        <br></br>
        <p>Thank you for your kind attention. Should there be any ambiguous, please feel free to contact us. We are looking forward to hearing good news from you and how we can serve you better.</p>
        <br></br>
        <p>Best Regards,</p>
        <br></br>
        <br></br>
        <p className='font-bold'>{params.sales?.name}</p>
      </div>
    </>
  )
}
