import { prisma } from "@/libs/prisma"

export async function GET (req, { params }) {
  const category = await prisma.ticketCategory.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(category)
}

export async function PUT (req, { params }) {
  const data = await req.json()
  const getCategory = await prisma.ticketCategory.update({
  where: {
    id: Number((await params).id)
  },
  data
  })
  return Response.json(getCategory)
}

export async function DELETE (req, {params}) {
  try {   
    const removeCategory = await prisma.ticketCategory.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removeCategory)
  } catch (error) {
    return Response.json(error.message)
  }
}