import { prisma } from "@/libs/prisma"

export async function GET() {
  const submenu = await prisma.submenu.findMany({
    orderBy: [
      {
        urutan: 'asc',
      },
    ],
    include: {
      menu: true,
    }
  })
  return Response.json(submenu)
}

export async function POST(req) {
  const urut = await prisma.submenu.count()
  const { title, path, icon, subMenu } = await req.json()
  const submenu = await prisma.submenu.create({
    data: {
      title,
      path,
      icon,
      menu: { connect: { id: subMenu } },
      urutan: urut + 1,
    }
  })
return Response.json(submenu)
}