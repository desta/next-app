import { prisma } from "@/libs/prisma"

export async function GET () {
  const newsCategory = await prisma.newsCategory.findMany()
  return Response.json(newsCategory)
}

export async function POST (req) {
  const { category } = await req.json()
  const newsCategory = await prisma.newsCategory.create({
    data: {
      category,
    }
  })
  return Response.json(newsCategory)
}