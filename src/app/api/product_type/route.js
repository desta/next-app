import { prisma } from "@/libs/prisma"

export async function GET () {
  const productType = await prisma.productType.findMany({
    include: {
      ProductCategory: true
    }
  })
  return Response.json(productType)
}

export async function POST (req) {
  const { productType } = await req.json()
  const productTypes = await prisma.productType.create({
    data: {
      productType,
    }
  })
  return Response.json(productTypes)
}