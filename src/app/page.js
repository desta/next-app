import { auth } from '@/auth'
import LoginForm from '@/components/dashboard/setting/user/LoginForm'
import { prisma } from '@/libs/prisma'
import { redirect } from 'next/navigation'
import markindo from './(homepage)/markindo'
import axiom from './(homepage)/axiom'
import { PagesList } from '@/utils/PagesList'

export async function metadata() {
  const data = await prisma.app.findUnique({
    where: {
      id: 0,
    },
    select: {
      namaapp: true,
      deskripsi: true,
      favicon: true,
    }
  })

  return {
    title: data.namaapp,
    description: data.deskripsi,
    icons: {
      icon: data.favicon !== '' ? data.favicon : '/favicon.ico',
    },
  }
};

//==========================Dashboard==========================

// export default async function page() {
//   const session = await auth()
//   const install = await prisma.install.findFirst()  
//   if (install === null) return redirect('/install')
//   else if (!session) return <LoginForm />  
//   return redirect('/dashboard')  

// }

//==========================Website==========================

export default async function page() {
  const session = await auth()
  const install = await prisma.install.findFirst()
  const app = await prisma.app.findUnique({
    where: {
      id: 0,
    },
    select: {
      homepage: true,
    }
  })
  if (install === null) return redirect('/install')
  else {
    if (app.homepage === PagesList.dashboard.title) {
      if (!session) return <LoginForm />
      else return redirect('/dashboard')
    }
    else if (app.homepage === PagesList.markindo.title) {
      return markindo()
    }
    else if (app.homepage === PagesList.axiom.title) {
      return axiom()
    }
    else {
      return <div>Website is not installed</div>
    }
  }
}
