import { auth } from "@/auth"
import { prisma } from "@/libs/prisma"

export async function GET() {
  const session = await auth()
  const agenda = await prisma.agenda.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      hour: "asc"
    }
  })
  return Response.json(agenda)
}

export async function POST(req) {
  const session = await auth()
  const { content, tanggal, jam } = await req.json()
  const agendas = await prisma.agenda.create({
    data: {
      content,
      tanggal,
      hour: jam.hour,
      minute: jam.minute,
      second: jam.second,
      millisecond: jam.millisecond,
      createdBy: {
        connect: {
          id: session.user.id
        }
      }
    }
  })
  return Response.json(agendas)
}