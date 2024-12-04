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

  const { displayReceiverNumber, messageBody, customer } = await req.json()

  let usr;
  if (session) {
    usr = session.user.id
  } else {
    usr = {}
  }

  let arr;
  if (customer.length !== 0) {
    arr = { id: Number(customer[0].id) }
  } else {
    arr = undefined
  }

  const customers = await prisma.customersChat.create({
    data: {
      displayReceiverNumber,
      messageBody,
      customer: { connect: arr },
      user: {
        connect: {
          id: usr
        }
      }
    }
  })
  return Response.json(customers)
}

export async function DELETE(req, { params }) {
  const data = await req.json()
  try {
    const removeChat = await prisma.customersChat.deleteMany({
      where: {
        displayReceiverNumber: data.displayReceiverNumber
      },
    })
    return Response.json(removeChat)
  } catch (error) {
    return Response.json(error.message)
  }
}