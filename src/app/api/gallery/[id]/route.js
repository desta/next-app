import { prisma } from "@/libs/prisma"

export async function GET(req, { params }) {
  const gallery = await prisma.gallery.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(gallery)
}

export async function PUT(req, { params }) {
  const data = await req.json()
  const { category } = data
  const getgallery = await prisma.gallery.update({
    where: {
      id: Number((await params).id)
    },
    data: {
      ...data,
      category: {
        set: category.map(id => ({ id: parseInt(id) }))
        // connect: category.map(id => ({ id: parseInt(id) }))
      }
    },
    include: {
      category: true
    }
  })
  return Response.json(getgallery)
}

export async function DELETE(req, { params }) {
  try {
    const removegallery = await prisma.gallery.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removegallery)
  } catch (error) {
    return Response.json(error.message)
  }
}