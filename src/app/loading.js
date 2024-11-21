'use client'
import { Button, Spinner } from '@nextui-org/react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Loading() {
  const router = useRouter();
  const [showBtn,setShowBtn] = useState(false);

  useEffect(()=>{
   setTimeout(()=>{
     setShowBtn(!showBtn);
   },10000)
  },[])

  return <div className="w-full h-screen flex justify-center flex-col items-center gap-4">
    <Spinner color="primary" />
    {showBtn && <Button onClick={() => window.location.href=window.location.href} color='secondary'>Reload page !</Button>}
  </div>
}
