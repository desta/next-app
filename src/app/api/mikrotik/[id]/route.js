import { prisma } from "@/libs/prisma"

export async function GET (req, { params }) {
  const mikrotik = await prisma.mikrotik.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(mikrotik)
}

export async function PUT (req, { params }) {
  const data = await req.json()
  const getMikrotik = await prisma.mikrotik.update({
  where: {
    id: Number((await params).id)
  },
  data
  })
  return Response.json(getMikrotik)
}

export async function DELETE (req, {params}) {
  try {   
    const removeMikrotik = await prisma.mikrotik.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removeMikrotik)
  } catch (error) {
    return Response.json(error.message)
  }
}