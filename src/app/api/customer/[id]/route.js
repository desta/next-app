import { prisma } from "@/libs/prisma"

export async function GET(req, { params }) {
  const customers = await prisma.customers.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(customers)
}

export async function PUT(req, { params }) {
  const data = await req.json()
  const getCustomers = await prisma.customers.update({
    where: {
      id: Number((await params).id)
    },
    data
  })
  return Response.json(getCustomers)
}

export async function DELETE(req, { params }) {
  const data = await req.json()
  try {
    const removeCustomers = await prisma.customers.delete({
      where: {
        id: Number((await params).id)
      }
    })

    const removeChat = await prisma.customersChat.deleteMany({
      where: {
        displayReceiverNumber: data.displayReceiverNumber
      }
    })
    return Response.json(removeCustomers, removeChat)
  } catch (error) {
    return Response.json(error.message)
  }
}