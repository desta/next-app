import { auth } from "@/auth"
import { prisma } from "@/libs/prisma"

export async function GET() {
  const ticket = await prisma.ticket.findMany({
    orderBy: [
      {
        judul: 'asc',
      },
    ],
  })
  return Response.json(ticket)
}

export async function POST(req) {
  const session = await auth()
  const { category, judul, deskripsi } = await req.json()
  const createTicket = await prisma.ticket.create({
    data: {
      category,
      judul,
      deskripsi,
      user: {
        connect: {
          id: session.user.id,
        },
      }
    }
  })
  return Response.json(createTicket)
}