import { prisma } from "@/libs/prisma"

export async function GET(req, { params }) {
  const article = await prisma.article.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(article)
}

export async function PUT(req, { params }) {
  const data = await req.json()
  const { category } = data
  const getarticle = await prisma.article.update({
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
  return Response.json(getarticle)
}

export async function DELETE(req, { params }) {
  try {
    const removearticle = await prisma.article.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removearticle)
  } catch (error) {
    return Response.json(error.message)
  }
}