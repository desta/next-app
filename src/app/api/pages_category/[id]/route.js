import { prisma } from "@/libs/prisma"

export async function GET(req, { params }) {
  const pagesCategory = await prisma.pagesCategory.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(pagesCategory)
}

export async function PUT(req, { params }) {
  const data = await req.json()
  const { category } = data
  const getpagesCategory = await prisma.pagesCategory.update({
    where: {
      id: Number((await params).id)
    },
    data: {
      category
    }
  })
  return Response.json(getpagesCategory)
}

export async function DELETE(req, { params }) {
  try {
    const removepagesCategory = await prisma.pagesCategory.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removepagesCategory)
  } catch (error) {
    return Response.json(error.message)
  }
}