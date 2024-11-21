"use client"
import FormRegister from '@/components/dashboard/setting/user/FormRegister'
import { Card } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export default function page() {
  const {data: session} = useSession()
  if (session?.user){
    return redirect('/dashboard')
  }
  return (
    <div className='flex flex-col gap-2 items-center justify-center h-screen bg-primary'>
      <Card className="min-w-[380px] max-w-md p-5">
        <FormRegister />
      </Card>
        <div>
          Punya akun? <Link href="/login" className='text-danger'>login disini</Link>
        </div>
    </div>
  )
}
