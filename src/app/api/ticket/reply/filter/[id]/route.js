import { auth } from "@/auth"
import { prisma } from "@/libs/prisma"

export async function GET (req, { params }) {
  const session = await auth()
  const ticket = await prisma.ticketReply.findMany({
    where: {
      pemilikId: session.user.id
    },
    include: {
      ticket: true,
    }
  })
  return Response.json(ticket)
}