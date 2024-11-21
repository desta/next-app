import { auth } from "@/auth"
import { prisma } from "@/libs/prisma"

export async function GET() {
  const reply = await prisma.ticketReply.findMany({
    orderBy: [
      {
        pertanyaan: 'asc',
      },
    ],
  })
  return Response.json(reply)
}

export async function POST(req) {
  const { id, reply, solusi } = await req.json()
  const session = await auth()
  const ticketReply = await prisma.ticketReply.create({
    data: {
      reply,
      solusi,
      pemilikId: session.user.id,
      ticket: {
        connect: {
          id: id
        }
      },
      user: {
        connect: {
          id: session.user.id
        }
      }
    }
  })
  return Response.json(ticketReply)
}