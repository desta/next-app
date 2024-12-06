import { auth } from "@/auth"
import { prisma } from "@/libs/prisma"

export async function GET() {
  const chat = await prisma.chat.findMany({
    orderBy: {
      createdAt: "asc",
    },
  })
  return Response.json(chat)
}

export async function POST(req) {
  const session = await auth()
  const { chat, chatId } = await req.json()
  const chats = await prisma.chat.create({
    data: {
      chat,
      chatId,
      user: {
        connect: {
          id: session.user.id
        }
      }
    }
  })
  return Response.json(chats)
}