import { prisma } from "@/libs/prisma"

export async function GET(req, { params }) {
  const agenda = await prisma.agenda.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(agenda)
}

export async function PUT(req, { params }) {
  const data = await req.json()
  const { content, tanggal, jam } = data;
  const getagenda = await prisma.agenda.update({
    where: {
      id: Number((await params).id)
    },
    data:{
      content,
      tanggal,
      hour: jam.hour,
      minute: jam.minute,
      second: jam.second,
      millisecond: jam.millisecond,
    }
  })
  return Response.json(getagenda)
}

export async function DELETE(req, { params }) {
  try {
    const removeagenda = await prisma.agenda.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removeagenda)
  } catch (error) {
    return Response.json(error.message)
  }
}