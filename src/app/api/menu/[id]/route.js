import { prisma } from "@/libs/prisma"

export async function GET (req, { params }) {
  const menu = await prisma.menu.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(menu)
}

export async function PUT (req, { params }) {
  const data = await req.json()
  const getmenu = await prisma.menu.update({
  where: {
    id: Number((await params).id)
  },
  data
  })
  return Response.json(getmenu)
}

export async function DELETE (req, {params}) {
  try {   
    const removemenu = await prisma.menu.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removemenu)
  } catch (error) {
    return Response.json(error.message)
  }
}