import { prisma } from "@/libs/prisma"

export async function GET (req, { params }) {
  const region = await prisma.region.findUnique({
    where: {
      id: Number(params.id)
    }
  })
  return Response.json(region)
}

export async function PUT (req, { params }) {
  const data = await req.json()
  const getregion = await prisma.region.update({
  where: {
    id: Number(params.id)
  },
  data
  })
  return Response.json(getregion)
}

export async function DELETE (req, {params}) {
  try {   
    const removeregion = await prisma.region.delete({
      where: {
        id: Number(params.id)
      }
    })
    return Response.json(removeregion)
  } catch (error) {
    return Response.json(error.message)
  }
}