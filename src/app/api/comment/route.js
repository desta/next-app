import { prisma } from "@/libs/prisma"

export async function GET() {
  const comment = await prisma.comment.findMany({
    orderBy: [
      {
        tanggal: 'asc',
      },
    ],
    include: {
      user: true,
    }
  })
  return Response.json(comment)
}

export async function POST(req) {
  const { content, user, article } = await req.json()
  const comment = await prisma.comment.create({
    data: {
      content,
      user: {
        connect:
        {
          id: user
        }
      },
      article:{
        connect:{
          id: article
        }
      }      
    }
  })
  return Response.json(comment)
}