import { auth } from "@/auth"
import { prisma } from "@/libs/prisma"
import { map } from "lodash"

export async function GET() {
  const article = await prisma.article.findMany({
    orderBy: [
      {
        tanggal: 'asc',
      },
    ],
    include: {
      category: true,
      createdBy: true,
      Comment: true,
    }
  })
  return Response.json(article)
}

export async function POST(req) {
  const session = await auth()
  const idImage = await prisma.productImages.findMany()
  const urut = idImage.length + 1
  const { title, content, category, publish, image } = await req.json()
  const article = await prisma.article.create({
    data: {
      title,
      content,
      publish,
      image:{
        connectOrCreate:{
          where:{
            id: urut
          },
          create:{
            image: image
          }
        }
      },
      category: {
        connect: map(category, (id) => ({ 
          id: parseInt(id)
         })),
      },
      createdBy: {
        connect: {
          id: session.user.id
        }
      }
    },
  })
  return Response.json(article)
}