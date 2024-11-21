import { prisma } from "@/libs/prisma"

export async function GET (req, { params }) {
  const productType = await prisma.productType.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(productType)
}

export async function PUT (req, { params }) {
  const data = await req.json()
  const getproductType = await prisma.productType.update({
  where: {
    id: Number((await params).id)
  },
  data
  })
  return Response.json(getproductType)
}

export async function DELETE (req, {params}) {
  try {   
    const removeproductType = await prisma.productType.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removeproductType)
  } catch (error) {
    return Response.json(error.message)
  }
}