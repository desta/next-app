"use client"
import { fetchCustomers } from '@/redux/slices/customer/customers'
import { fetchUser } from '@/redux/slices/user'
import { Button, Input, Select, SelectItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast';

export default function EditQuotation({ params }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [customer, setCustomer] = useState(params.customer.id)
  const [sales, setSales] = useState(params.sales.id)
  const customers = useSelector(state => state.customers.data)
  const users = useSelector(state => state.user.data)
  const [quotation, setQuotation] = useState([...params.items])
  const [totalFinal, setTotalFinal] = useState(0)

  const handleClick = () => {
    setQuotation([...quotation, { item: '', qty: 0, harga: 0, total: 0, subTotal: totalFinal }])
  }

  const handleChange = (e, i) => {
    const { name, value } = e.target
    const onchangeVal = [...quotation]
    onchangeVal[i][name] = value
    onchangeVal[i]['total'] = parseInt(quotation[i]['qty']) * parseInt(quotation[i]['harga'])
    setTotalFinal(parseInt(quotation[i]['subTotal']) + quotation[i]['total'])
    setQuotation(onchangeVal)
  }

  const handleDelete = (i) => {
    const deleteVal = [...quotation]
    deleteVal.splice(i, 1)
    setQuotation(deleteVal)
    setTotalFinal(totalFinal - quotation[i]['total'])
  }

  useEffect(() => {
    dispatch(fetchCustomers())
    dispatch(fetchUser())
  }, [])

  const handleSubmitForm = async (e, i) => {
    e.preventDefault()
    const res = await fetch(`/api/quotation/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer,
        sales,
        quotation,        
      }),
    })
    if (res.ok) {
      toast.success('Edit quotation berhasil')
      router.refresh()
      setQuotation([{ item: undefined, qty: 0, harga: 0, total: 0 }])
    } else {
      toast.error('Edit quotation gagal')
    }
  }
  return (
    <form onSubmit={handleSubmitForm}>
      <div className='flex flex-col sm:flex-row gap-2 pt-3'>
        <Select
          items={customers}
          labelPlacement='outside'
          className="font-bold"
          color='primary'
          label="Customer"
          placeholder="Nama customer"
          variant="bordered"
          id="customer"
          name="customer"
          isRequired
          selectedKeys={[customer]}
          onSelectionChange={(e) => {
            setCustomer(e.currentKey);
          }}
        >
          {(customers) => <SelectItem>{customers.perusahaan}</SelectItem>}
        </Select>
        <Select
          items={users}
          labelPlacement='outside'
          className="font-bold"
          color='primary'
          label="Sales"
          placeholder="Nama sales"
          variant="bordered"
          id="sales"
          name="sales"
          isRequired
          selectedKeys={[sales]}
          onSelectionChange={(e) => {
            setSales(e.currentKey);
          }}
        >
          {(users) => <SelectItem>{users.name}</SelectItem>}
        </Select>
      </div>
      <Table aria-label="Tabel items quotation" isStriped removeWrapper className='py-3'>
        <TableHeader>
          <TableColumn className='bg-secondary text-secondary-foreground hover:text-secondary-foreground'>Item</TableColumn>
          <TableColumn className='bg-secondary text-secondary-foreground hover:text-secondary-foreground w-[100px]'>Qty</TableColumn>
          <TableColumn className='bg-secondary text-secondary-foreground hover:text-secondary-foreground'>Harga</TableColumn>
          <TableColumn className='bg-secondary text-secondary-foreground hover:text-secondary-foreground'>Total</TableColumn>
          <TableColumn className='bg-secondary text-secondary-foreground hover:text-secondary-foreground text-center'>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {
            quotation.map((val, i) =>
              <TableRow key={i}>
                <TableCell><Input
                  labelPlacement='outside'
                  className="font-bold"
                  color='primary'
                  placeholder="Item"
                  variant="bordered"
                  name="item"
                  id="item"
                  isRequired
                  value={val.item} onChange={(e) => handleChange(e, i)}
                /></TableCell>
                <TableCell><Input
                  type='number'
                  labelPlacement='outside'
                  className="font-bold"
                  color='primary'
                  placeholder="Qty"
                  variant="bordered"
                  name="qty"
                  id="qty"
                  defaultValue='0'
                  isRequired
                  value={val.qty === 0 ? '' : val.qty} onChange={(e) => handleChange(e, i)}
                /></TableCell>
                <TableCell><Input
                  type='number'
                  labelPlacement='outside'
                  className="font-bold"
                  color='primary'
                  placeholder="Harga item"
                  variant="bordered"
                  name="harga"
                  id="harga"
                  defaultValue='0'
                  isRequired
                  value={val.harga === 0 ? '' : val.harga} onChange={(e) => handleChange(e, i)}
                /></TableCell>
                <TableCell><Input
                  disabled
                  className="font-bold"
                  color='secondary'
                  placeholder="Total"
                  id="total"
                  defaultValue='0'
                  value={val.total === 0 ? '' : val.total}
                /></TableCell>
                <TableCell className='text-center'>{i === 0 ? '-' : <Button isIconOnly onPress={() => handleDelete(i)} color='danger'><BiTrash /></Button>}</TableCell>
              </TableRow>
            )
          }
          <TableRow key="44" className='border-t-2'>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className='font-bold text-right'>Sub total</TableCell>
            <TableCell><div className='flex justify-between font-bold'><span >Rp.</span><span>{totalFinal}</span></div></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className='flex justify-end'>
        <Button onPress={handleClick} variant="ghost" color='secondary'>Tambah item</Button>
      </div>
      <Button type='submit' color='secondary'>Edit quotation</Button>
    </form>
  )
}
