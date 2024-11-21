import { prisma } from "@/libs/prisma"

export async function GET() {
  const comment = await prisma.commentReply.findMany({
    orderBy: [
      {
        tanggal: 'asc',
      },
    ],
  })
  return Response.json(comment)
}

export async function POST(req) {
  const { nama, content, comment } = await req.json()
  const reply = await prisma.commentReply.create({
    data: {
      nama,
      content,
      comment:{
        connect:{
          id: comment
        }
      }      
    }
  })
  return Response.json(reply)
}