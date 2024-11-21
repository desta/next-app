import { prisma } from "@/libs/prisma"

export async function GET (req, { params }) {
  const invoice = await prisma.invoice.findUnique({
    where: {
      id: Number((await params).id)
    },
    include: {
      createdBy: true,
      quotation: true,
    }
  })
  return Response.json(invoice)
}