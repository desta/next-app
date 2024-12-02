import { prisma } from "@/libs/prisma"

export async function GET (req, { params }) {
  const customers = await prisma.customersChat.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(customers)
}

export async function PUT (req, { params }) {
  const data = await req.json()
  const getCustomers = await prisma.customers.update({
  where: {
    id: Number((await params).id)
  },
  data
  })
  return Response.json(getCustomers)
}

export async function DELETE (req, {params}) {
  const rem = await prisma.customersChat.deleteMany({
    where:{
      displayReceiverNumber: Number((await params).id)
    }
    
  })
  try {   
    const removeCustomers = await prisma.customersChat.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removeCustomers)
  } catch (error) {
    return Response.json(error.message)
  }
}