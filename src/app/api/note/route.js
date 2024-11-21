import { auth } from "@/auth"
import { prisma } from "@/libs/prisma"

export async function GET() {
  const session = await auth()
  const note = await prisma.note.findMany({
    where: {
      userId: session.user.id
    }
  })
  return Response.json(note)
}

export async function POST(req) {
  const session = await auth()
  const { note } = await req.json()
  const notes = await prisma.note.create({
    data: {
      note,
      createdBy: {
        connect: {
          id: session.user.id
        }
      }
    }
  })
  return Response.json(notes)
}