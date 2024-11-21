import { prisma } from "@/libs/prisma"

export async function GET() {
  const menu = await prisma.menu.findMany({
    orderBy: [
      {
        urutan: 'asc',
      },
    ],
  })
  return Response.json(menu)
}

export async function POST(req) {
  const urut = await prisma.menu.count()
  const { title, path, icon, lokasi } = await req.json()
  const menu = await prisma.menu.create({
    data: {
      title,
      path,
      icon,
      lokasi,
      urutan: urut + 1,
    }
  })
return Response.json(menu)
}