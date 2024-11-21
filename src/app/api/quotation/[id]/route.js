import { auth } from "@/auth"
import { prisma } from "@/libs/prisma"

export async function GET(req, { params }) {
  const quotation = await prisma.quotation.findUnique({
    where: {
      id: Number((await params).id)
    },
    include: {
      customer: true,
      sales: true,
      items: true,
      invoice: true,
      deliveryOrder: true,
      createdBy: true
    }
  })
  return Response.json(quotation)
}

export async function PUT(req, { params }) {
  const session = await auth()
  const { customer, sales, quotation, subTotal } = await req.json()
  const itemes = quotation.map((item) => {
    let res = {}
    res.item = item.item
    res.qty = parseInt(item.qty)
    res.harga = parseInt(item.harga)
    res.total = parseInt(item.total)
    res.subTotal = 0
    return res
  })
  const quotationPost = await prisma.quotation.update({
    where: {
      id: Number((await params).id)
    },
    data: {
      subTotal,
      customer: {
        connect: {
          id: parseInt(customer)
        }
      },
      sales: {
        connect: {
          id: sales
        }
      },
      items: {       
        create: [
          ...itemes
        ]
      },
      createdBy:{
        create:{
          user: {
            connect: {
              id: session.user.id
            }
          }          
        }
      }
    },
    include: {
      customer: true,
      sales: true,
      items: true,
      createdBy: {
        include: {
          user: true
        }
      }
    }
  })
  return Response.json(quotationPost)
}

export async function DELETE(req, { params }) {
  try {
    const quotation = await prisma.quotation.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(quotation)
  } catch (error) {
    return Response.json(error.message)
  }
}