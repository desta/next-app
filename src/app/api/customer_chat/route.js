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
  console.log('cuss', customer)

  let usr;
  if (session) {
    usr = session.user.id
  } else {
    usr = {}
  }
  
  let arr;
  if (customer.length !== 0) {
    arr =  { id: Number(customer[0].id) }
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