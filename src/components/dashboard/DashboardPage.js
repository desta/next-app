"use client"
import { fetchApp } from '@/redux/slices/app';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import ListNote from '@/components/dashboard/note/ListNote';
import HomeCounterGraph from '@/components/dashboard/counter/HomeCounterGraph';
import { fetchAgendas } from '@/redux/slices/agendas';
import { formatAgenda } from '../../utils/Utils';

const columns = [
  { uid: "title", name: "Title" },
  { uid: "productType", name: "Product Type" },
];

export default function DashboardPage() {
  const session = useSession()
  const dispatch = useDispatch()
  const [tanggal, setTanggal] = useState(new Date());
  const app = useSelector((state) => state.app)
  const agendas = useSelector((state) => state.Agenda.data)

  useEffect(() => {
    dispatch(fetchApp())
    dispatch(fetchAgendas())
  }, [])

  if (session.status === "unauthenticated") {
    redirect("/login")
  } else if (session.status === "authenticated") {
    return (
      <>
        <div className='mb-5 text-sm lg:text-lg'>
          <div className='flex flex-col xl:flex-row gap-3'>
            <div className='hidden md:block w-full xl:w-9/12'>
              <HomeCounterGraph />
            </div>
            <div className='flex flex-col w-full md:flex-row xl:w-1/4 xl:flex-col gap-3'>
              <Card fullWidth>
                <CardBody>
                  <div className='flex justify-between items-center'>
                    <div>
                      <p className='font-bold'>Marking & Coding</p>
                      <p className='text-sm text-gray-500'>Total & unpublish</p>
                    </div>
                    <p className='font-bold text-2xl'><span className='text-success'>40</span>/<span className='text-danger'>2</span></p>
                  </div>
                </CardBody>
              </Card>
              <Card fullWidth>
                <CardBody>
                  <div className='flex justify-between items-center'>
                    <div>
                      <p className='font-bold'>Packaging</p>
                      <p className='text-sm text-gray-500'>Total & unpublish</p>
                    </div>
                    <p className='font-bold text-2xl'><span className='text-success'>20</span>/<span className='text-danger'>0</span></p>
                  </div>
                </CardBody>
              </Card>
              <Card fullWidth className='max-h-96'>
                <CardBody>
                  <div className='font-bold'>Agenda hari ini</div>
                  {
                    agendas.filter(x => {
                      return formatAgenda(x.tanggal) === formatAgenda(tanggal)
                    }).length === 0 ?
                      <div className='p-2 text-center italic text-gray-500 text-sm'>Tidak ada agenda.</div>
                      :
                      agendas.filter(x => formatAgenda(x.tanggal) === formatAgenda(tanggal)).map((item, index) =>
                        <div key={index} className='p-1 bg-slate-100 overflow-y-auto flex items-center gap-2 mb-1'>
                          <p className='text-left text-sm lg:text-lg font-bold'>{item.hour === 0 ? '00' : item.hour}:{item.minute === 0 ? '00' : item.minute}</p>
                          <p className='text-left text-sm'>{item.content}</p>
                        </div>)
                  }
                </CardBody>
              </Card>
            </div>
          </div>
        </div>

        <div className='mb-5'>
          <ListNote />
          <div className='flex flex-col md:flex-row gap-3'>
            <div className='w-full md:w-1/2 xl:w-full'>
              <div className='text-xl font-bold pb-3'>Product terbaru</div>
              <Table aria-label="New product table" isStriped>
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn key={column.uid} className="bg-secondary text-secondary-foreground"                    >
                      {column.name}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>Tony Reichert</TableCell>
                    <TableCell>CEO</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>Zoey Lang</TableCell>
                    <TableCell>Technical Lead</TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>Jane Fisher</TableCell>
                    <TableCell>Senior Developer</TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>William Howard</TableCell>
                    <TableCell>Community Manager</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className='w-full md:w-1/2 xl:w-full'>
              <div className='text-xl font-bold pb-3'>News</div>
              <Table aria-label="New product table" isStriped>
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn key={column.uid} className="bg-secondary text-secondary-foreground">
                      {column.name}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>Tony Reichert</TableCell>
                    <TableCell>CEO</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>Zoey Lang</TableCell>
                    <TableCell>Technical Lead</TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>Jane Fisher</TableCell>
                    <TableCell>Senior Developer</TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>William Howard</TableCell>
                    <TableCell>Community Manager</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return null
  }
}
