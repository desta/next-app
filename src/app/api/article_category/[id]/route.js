import { prisma } from "@/libs/prisma"

export async function GET (req, { params }) {
  const articleCategory = await prisma.articleCategory.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(articleCategory)
}

export async function PUT (req, { params }) {
  const data = await req.json()
  const getarticleCategory = await prisma.articleCategory.update({
  where: {
    id: Number((await params).id)
  },
  data
  })
  return Response.json(getarticleCategory)
}

export async function DELETE (req, {params}) {
  try {   
    const removearticleCategory = await prisma.articleCategory.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removearticleCategory)
  } catch (error) {
    return Response.json(error.message)
  }
}