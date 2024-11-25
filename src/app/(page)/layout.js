import './layout.css'
import 'react-image-gallery/styles/css/image-gallery.css';

import React from 'react'
import { prisma } from "@/libs/prisma";
import parse from 'html-react-parser';
import { auth } from "@/auth";
import KontakKami from '@/components/client/markindo/KontakKami';
import Footer from '@/components/client/markindo/Footer';
import MarkindoNav from '@/components/client/markindo/MarkindoNav';
import AxiomNav from '@/components/client/axiom/AxiomNav';
import AxiomContactUs from '@/components/client/axiom/AxiomContactUs';
import { PagesList } from '@/utils/pages';

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

export default async function layout({ children }) {
  const session = await auth();
  const app = await prisma.app.findFirst();

  const components = await prisma.component.findMany({
    orderBy: [
      {
        urutan: 'asc',
      },
    ],
  });
  const menu = await prisma.menu.findMany({
    orderBy: [
      {
        urutan: 'asc',
      },
    ],
    include: {
      Submenu: true,
    }
  });

  const submenu = await prisma.submenu.findMany({
    orderBy: [
      {
        urutan: 'asc',
      },
    ],
    include: {
      menu: true,
    }
  });

  console.log(app)
  return (
    <>
      {
        app.homepage === PagesList.markindo.title ?
          <div className='flex flex-col justify-between min-h-screen'>
            <div>
              <MarkindoNav params={app} session={session} menu={menu} submenu={submenu} />
              <div className='pt-[68px] pb-[100px]'>
                <main className='py-5'>
                  {children}
                </main>
              </div>
            </div>
            <div>
              <KontakKami />
              <Footer params={app} />
            </div>
          </div>
          :
          app.homepage === PagesList.axiom.title ?
            <div className='flex flex-col justify-between min-h-screen' >
              <div>
                <AxiomNav params={app} session={session} menu={menu} submenu={submenu} />
                <div className='pt-[68px] pb-[100px]'>
                  <main className='py-5'>
                    {children}
                  </main>
                </div>
              </div>
              <div>
                <AxiomContactUs />
              </div>
            </div >
            :
            <div className='flex flex-col justify-between min-h-screen'>
              No data
            </div>
      }

    </>
  )
}
