import { prisma } from "@/libs/prisma"

export async function GET () {
  const smtp = await prisma.smtp.findMany()
  
  return Response.json(smtp)
}

export async function POST (req) {
  const { alamatemail, password, dashboardemail, host, port } = await req.json()
  const smtp = await prisma.smtp.create({
    data: {
      alamatemail,
      password,
      dashboardemail,
      host,
      port
    }
  })
  return Response.json(smtp)
}