import { prisma } from "@/libs/prisma"

export async function GET (req, { params }) {
  const productCategory = await prisma.productCategory.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(productCategory)
}

export async function PUT (req, { params }) {
  const data = await req.json()
const {productType, category} = data
  const getproductCategory = await prisma.productCategory.update({
  where: {
    id: Number((await params).id)
  },
  data:{
    category,
    productType: {
      connect:{
        id: Number(productType)
      }
      }
    }
  })
  return Response.json(getproductCategory)
}

export async function DELETE (req, {params}) {
  try {   
    const removeproductCategory = await prisma.productCategory.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removeproductCategory)
  } catch (error) {
    return Response.json(error.message)
  }
}