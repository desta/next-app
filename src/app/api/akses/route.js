import { prisma } from "@/libs/prisma"

export async function GET() {
  const akses = await prisma.akses.findMany()
  return Response.json(akses)
}

