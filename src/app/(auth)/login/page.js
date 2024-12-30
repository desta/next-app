import { auth } from '@/auth';
import LoginForm from '@/components/dashboard/setting/user/LoginForm'
import { prisma } from '@/libs/prisma'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata = {
  title: 'Login dashboard',
};

export default async function page() {
  const session = await auth();
  const install = await prisma.install.findFirst();  
  if (install === null) return redirect('/install')
  else if (session === null) return <LoginForm />
  else return redirect('/dashboard')
}
