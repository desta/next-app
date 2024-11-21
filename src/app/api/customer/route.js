import { prisma } from "@/libs/prisma"

export async function GET () {
  const customers = await prisma.customers.findMany({
    orderBy: [
      {
        perusahaan: 'asc',
      },
    ],
  })
  return Response.json(customers)
}

export async function POST (req) {
  const { perusahaan, pic, alamat, nohp, email} = await req.json()
  const customers = await prisma.customers.create({
    data: {
      perusahaan,
      pic,
      alamat,
      nohp,
      email
    }
  })
  return Response.json(customers)
}