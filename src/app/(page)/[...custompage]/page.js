// import React from 'react'
// import parse from 'html-react-parser';
// import { prisma } from '@/libs/prisma'
// import Layout2 from './Layout2';
// import { LayoutList } from '@/utils/LayoutList';
// import Layout3 from './Layout3';
// import Layout1 from './Layout1';

// export default async function page({ params }) {
//   const getData = async () => {
//     const res = await prisma.pages.findMany({
//       where: {
//         publish: true,
//         path: (await params).custompage[0]
//       },
//       include: {
//         category: true,
//         gallery: true,
//       }
//     })
//     return res;
//   }
//   const data = await getData();

//   return (
//     <>
//       {data.length > 0 ? (
//         <>
//           {data[0].layout === LayoutList.layout1.layout && <Layout1 data={data[0]} />}
//           {data[0].layout === LayoutList.layout2.layout && <Layout2 data={data[0]} />}
//           {data[0].layout === LayoutList.layout3.layout && <Layout3 data={data[0]} />}
//         </>
//       ) : (
//         <div>
//           <h1>404</h1>
//         </div>
//       )}
//     </>
//   )
// }
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
