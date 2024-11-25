// Axiom.co.id
import "./axiom.css";
import NavBarItem from "@/components/client/axiom/AxiomNav";
import { prisma } from "@/libs/prisma";
import parse from 'html-react-parser';
import { auth } from "@/auth";
import HomeCounter from "@/components/dashboard/counter/HomeCounter";
import AxiomContactUs from "@/components/client/axiom/AxiomContactUs";
import { PagesList } from "@/utils/PagesList";

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

export default async function layout() {
  const session = await auth();
  const app = await prisma.app.findFirst();
  const pages = PagesList.axiom.title;
  const components = await prisma.component.findMany({
    where: {
      page: pages
    },
    orderBy: [
      {
        urutan: 'asc',
      },
    ],
    include: {
      image: true,
    }
  });
  return (
    <>
      <HomeCounter />
      <NavBarItem params={app} session={session} />
      <section>
        <div className="main-cover">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className="w-full text-center -mt-[100px] font-bold">
            {components.filter((item) => item.region === pagesList.axiom.pages.home.regions.header.title).map((c) => {
              return (
                <div key={c.id}>
                  <p className="">{c.title}</p>
                  <div className="parser">{parse(c.content)}</div>
                </div>
              )
            }
            )}
          </div>
        </div>
      </section>
      {/* About */}
      <section className="max-w-7xl mx-auto px-2 py-20">
        {components.filter((item) => item.region === pagesList.axiom.pages.home.regions.header.title).map((c) => {
          return (
            <div key={c.id}>
              <p className="font-bold text-center">{c.title}</p>
              <div className="parser">{parse(c.content)}</div>
            </div>
          )
        }
        )}
        <div className="flex flex-col lg:flex-row gap-2 py-10">
          {components.filter((item) => item.region === pagesList.axiom.pages.home.regions.header.title).map((c) => {
            return (
              <div key={c.id} className="w-full lg:w-1/2 border border-gray-300 rounded-md p-4">
                <p className="font-bold text-2xl flex gap-2"><i className="bi bi-layers-half"></i>{c.title}</p>
                <div className="parser">{parse(c.content)}</div>
              </div>
            )
          }
          )}
          {components.filter((item) => item.region === pagesList.axiom.pages.home.regions.header.title).map((c) => {
            return (
              <div key={c.id} className="w-full lg:w-1/2 border border-gray-300 rounded-md p-4">
                <p className="font-bold text-2xl flex gap-2"><i className="bi bi-layers-half"></i>{c.title}</p>
                <div className="parser">{parse(c.content)}</div>
              </div>
            )
          }
          )}
        </div>
      </section>

      {/* solution */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-2">
          <h2 className="text-3xl font-bold text-center mb-10 text-white">SOLUTION AND SERVICES</h2>
          <div className="container mx-auto px-2 text-sm lg:text-lg flex flex-wrap justify-center gap-4">
            {components.filter((item) => item.region === pagesList.axiom.pages.home.regions.header.title).map((c) =>
              <div key={c.id} className="flip-container w-72 h-96 hover:cursor-pointer">
                <div className="flipper">
                  <div className="front bg-black text-white rounded-2xl w-72 h-96">
                    <img src={'/api/public' + c.image[0]?.image} alt="1" className="w-full h-60" />
                    <p className="p-2 text-lg lg:text-2xl font-bold text-center">{c.title}</p>
                  </div>
                  <div className="back bg-black text-white rounded-2xl w-72 h-96 p-4">
                    <div className="pb-2 text-sm">{parse(c.content)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* services */}
      <section className="bg-grey-100 py-20">
        <div className="max-w-7xl mx-auto px-2 text-sm lg:text-lg">
          {components.filter((item) => item.region === pagesList.axiom.pages.home.regions.header.title).map(c =>
            <div className="py-5" key={c.id}>
              <div className="flex gap-3 flex-col lg:flex-row">
                <div className="order-2 lg:order-1 w-full ">
                  <p className="text-medium lg:text-2xl font-bold pb-5">{c.title}</p>
                  <div className="parser">{parse(c.content)}</div>
                </div>
                <div className="order-1 lg:order-2 flex justify-center">
                  <img src={'/api/public' + c.image[0]?.image} alt="1" />
                </div>
              </div>
            </div>
          )}
        </div>
      </section >

      {/* our product */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-2 text-center">
          <div className="text-3xl font-bold">OUR PRODUCTS</div>
          <div className="font-bold">Infrastructures</div>
          <div className="enable-animation py-5">
            <div className="marquee marquee--hover-pause">
              <ul className="marquee__content__contras">
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
              </ul>
              <ul aria-hidden="true" className="marquee__content__contras">
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
              </ul>
            </div>
          </div>
          <div className="font-bold">Application software</div>
          <div className="enable-animation py-5">
            <div className="marquee marquee--reverse marquee--hover-pause">
              <ul className="marquee__content__contras">
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
              </ul>
              <ul aria-hidden="true" className="marquee__content__contras">
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
                <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our customers */}
      <section className="max-w-7xl mx-auto px-2 py-20 text-center">
        <div className="text-3xl font-bold">OUR CUSTOMERS</div>
        <div className="enable-animation py-5">
          <div className="marquee marquee--hover-pause">
            <ul className="marquee__content">
              <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
              <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
              <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
              <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
              <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
              <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
            </ul>
            <ul aria-hidden="true" className="marquee__content">
              <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
              <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
              <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
              <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
              <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>
              <li><img src="/asset/layout1.png" className="h-28 w-full" /></li>

            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <AxiomContactUs />
    </>
  )
}
