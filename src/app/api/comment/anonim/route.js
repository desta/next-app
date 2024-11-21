import { prisma } from "@/libs/prisma"

export async function GET() {
  const comment = await prisma.comment.findMany({
    orderBy: [
      {
        tanggal: 'asc',
      },
    ],
  })
  return Response.json(comment)
}

export async function POST(req) {
  const { nama, content, article } = await req.json()
  const comment = await prisma.comment.create({
    data: {
      nama,
      content,
      article:{
        connect:{
          id: article
        }
      }      
    }
  })
  return Response.json(comment)
}