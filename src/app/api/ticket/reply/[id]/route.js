import { auth } from "@/auth"
import { prisma } from "@/libs/prisma"

export async function GET (req, { params }) {
  const ticket = await prisma.ticketReply.findMany({
    where: {
      ticketId: Number((await params).id)
    },
    include: {
      ticket: true,
      user: true,
    }
  })
  return Response.json(ticket)
}