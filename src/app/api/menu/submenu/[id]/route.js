import { prisma } from "@/libs/prisma"

export async function GET(req, { params }) {
  const submenu = await prisma.submenu.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(submenu)
}

export async function PUT(req, { params }) {
  const data = await req.json()
  const { menu } = data
  const getsubmenu = await prisma.submenu.update({
    where: {
      id: Number((await params).id)
    },
    data: {
      ...data,
      menu: {
        connect: {
          id: Number(menu)
        }
      }
    }
  })
  return Response.json(getsubmenu)
}

export async function DELETE(req, { params }) {
  try {
    const removesubmenu = await prisma.submenu.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removesubmenu)
  } catch (error) {
    return Response.json(error.message)
  }
}