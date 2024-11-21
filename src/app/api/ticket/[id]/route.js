import { auth } from "@/auth"
import { prisma } from "@/libs/prisma"

export async function GET(req, { params }) {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(ticket)
}

export async function PUT(req, { params }) {
  const data = await req.json()
  const getTicket = await prisma.ticket.update({
    where: {
      id: Number((await params).id)
    }, 
    data
  })
  return Response.json(getTicket)
}

export async function DELETE(req, { params }) {
  try {
    const removeTicket = await prisma.ticket.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removeTicket)
  } catch (error) {
    return Response.json(error.message)
  }
}