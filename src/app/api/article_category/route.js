import { prisma } from "@/libs/prisma"

export async function GET () {
  const articleCategory = await prisma.articleCategory.findMany()
  return Response.json(articleCategory)
}

export async function POST (req) {
  const { category } = await req.json()
  const articleCategory = await prisma.articleCategory.create({
    data: {
      category,
    }
  })
  return Response.json(articleCategory)
}