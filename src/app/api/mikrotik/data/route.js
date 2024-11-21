import { prisma } from "@/libs/prisma"

export async function GET () {
  const mikrotik = await prisma.mikrotik.findMany()
  return Response.json(mikrotik)
}

export async function POST (req) {
  const { ip, username, password } = await req.json()
  const mikrotik = await prisma.mikrotik.create({
    data: {
      ip,
      username,
      password
    }
  })
  return Response.json(mikrotik)
}