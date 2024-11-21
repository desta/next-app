import { prisma } from "@/libs/prisma"

export async function GET (req, { params }) {
  const faq = await prisma.faq.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(faq)
}

export async function PUT (req, { params }) {
  const data = await req.json()
  const getFaq = await prisma.faq.update({
  where: {
    id: Number((await params).id)
  },
  data
  })
  return Response.json(getFaq)
}

export async function DELETE (req, {params}) {
  try {   
    const removeFaq = await prisma.faq.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removeFaq)
  } catch (error) {
    return Response.json(error.message)
  }
}