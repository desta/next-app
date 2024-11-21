import { prisma } from "@/libs/prisma"

export async function GET () {
  const invoice = await prisma.invoice.findMany({
    orderBy: [
      {
        tanggal: 'asc',
      },
    ],
  })
  return Response.json(invoice)
}

export async function POST (req) {
  const { po, createdBy, quotation } = await req.json()
  const invoice = await prisma.invoice.create({
    data: {
     po,
     createdBy:{
       connect: {
         id: createdBy
       }
     },
     quotation:{
       connect: {
         id: quotation
       }
     }
    }
  })
  return Response.json(invoice)
}