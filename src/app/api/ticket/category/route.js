import { prisma } from "@/libs/prisma"

export async function GET () {
  const category = await prisma.ticketCategory.findMany({
    orderBy: [
      {
        id: 'asc',
      },
    ],
  })
  return Response.json(category)
}

export async function POST (req) {
  const { category } = await req.json()
  const createCategory = await prisma.ticketCategory.create({
    data: {
      category
    }
  })
  return Response.json(createCategory)
}