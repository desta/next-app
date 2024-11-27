import { auth } from "@/auth"
import { prisma } from "@/libs/prisma"

export async function GET() {
  const customers = await prisma.customersChat.findMany({
    orderBy: [
      {
        createdAt: 'asc',
      },
    ],
    include: {
      customer: true,
    }
  })
  return Response.json(customers)
}

export async function POST(req, { params }) {
  const session = await auth()
  const incomingChat = '021'
  
  const wa = await prisma.customers.findUnique({
    where: {
      nohp: incomingChat
    }
  })

  let sender;
  if (session) {
    sender = session.user.username
  } else {
    sender = wa.id
  }
  
  const { message, customer } = await req.json()
  const customers = await prisma.customersChat.create({
    data: {
      message,
      customer: {
        connect: {
          id: customer
        }
      },
      sender,
    }
  })
  return Response.json(customers)
}