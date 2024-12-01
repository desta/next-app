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
      user: true
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

  // let senderName;
  // if (session) {
  //   senderName = session.user.username
  // } else {
  //   senderName = wa.id
  // }
  const { displayReceiverNumber, messageBody, customer } = await req.json()

  let usr;
  if (session) {
    usr = session.user.id 
  } else {
    usr = {}
  }

  let cus
  if (customer) {
    cus = customer
  } else {
    cus = {}
  }

  const customers = await prisma.customersChat.create({
    data: {
      displayReceiverNumber,
      messageBody,
      customer: {
        connect: {
          id: cus
        }
      },
      user: {
        connect: {
          id: usr
        }
      }
    }
  })
  return Response.json(customers)
}