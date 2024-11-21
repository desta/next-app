import { prisma } from "@/libs/prisma"

export async function GET () {
  const faq = await prisma.faq.findMany({
    orderBy: [
      {
        pertanyaan: 'asc',
      },
    ],
  })
  return Response.json(faq)
}

export async function POST (req) {
  const { pertanyaan, jawaban } = await req.json()
  const faq = await prisma.faq.create({
    data: {
      pertanyaan,
      jawaban
    }
  })
  return Response.json(faq)
}