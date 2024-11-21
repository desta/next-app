import { prisma } from "@/libs/prisma"

export async function GET (req, { params }) {
  const comment = await prisma.comment.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(comment)
}

export async function PUT (req, { params }) {
  const data = await req.json()
  const getcomment = await prisma.comment.update({
  where: {
    id: Number((await params).id)
  },
  data
  })
  return Response.json(getcomment)
}

export async function DELETE (req, {params}) {
  try {   
    const removecomment = await prisma.comment.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removecomment)
  } catch (error) {
    return Response.json(error.message)
  }
}