import { prisma } from "@/libs/prisma"

export async function GET (req, { params }) {
  const note = await prisma.note.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(note)
}

export async function PUT (req, { params }) {
  const data = await req.json()
  const getnote = await prisma.note.update({
  where: {
    id: Number((await params).id)
  },
  data
  })
  return Response.json(getnote)
}

export async function DELETE (req, {params}) {
  try {   
    const removenote = await prisma.note.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removenote)
  } catch (error) {
    return Response.json(error.message)
  }
}