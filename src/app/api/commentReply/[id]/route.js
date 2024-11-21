import { prisma } from "@/libs/prisma"

export async function GET (req, { params }) {
  const comment = await prisma.commentReply.findUnique({
    where: {
      id: Number(params.id)
    }
  })
  return Response.json(comment)
}

export async function PUT (req, { params }) {
  const data = await req.json()
  const getcomment = await prisma.commentReply.update({
  where: {
    id: Number(params.id)
  },
  data
  })
  return Response.json(getcomment)
}

export async function DELETE (req, {params}) {
  try {   
    const removecomment = await prisma.commentReply.delete({
      where: {
        id: Number(params.id)
      }
    })
    return Response.json(removecomment)
  } catch (error) {
    return Response.json(error.message)
  }
}