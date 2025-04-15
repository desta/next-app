import { prisma } from "@/libs/prisma"

export async function GET (req, { params }) {
  const newsCategory = await prisma.newsCategory.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(newsCategory)
}

export async function PUT (req, { params }) {
  const data = await req.json()
  const getNewsCategory = await prisma.newsCategory.update({
  where: {
    id: Number((await params).id)
  },
  data
  })
  return Response.json(getNewsCategory)
}

export async function DELETE (req, {params}) {
  try {   
    const removeNewsCategory = await prisma.newsCategory.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removeNewsCategory)
  } catch (error) {
    return Response.json(error.message)
  }
}