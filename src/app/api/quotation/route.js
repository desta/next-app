import { auth } from "@/auth"
import { prisma } from "@/libs/prisma"

export async function GET() {
  const quotation = await prisma.quotation.findMany({
    include: {
      customer: true,
      sales: true,
    }
  })
  return Response.json(quotation)
}

export async function POST(req) {
  const session = await auth()
  const { customer, sales, quotation } = await req.json()
  const itemes = quotation.map((item) => {
    let res = {}
    res.item = item.item
    res.qty = parseInt(item.qty)
    res.harga = parseInt(item.harga)
    res.total = parseInt(item.total)
    res.subTotal = 0
    return res
  })
  const quotationPost = await prisma.quotation.create({
    data: {
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
      createdBy: {
        create: {
          user: {
            connect: {
              id: session.user.id
            }
          }
        }
      }
    }
  })
  return Response.json(quotationPost)
}