import { prisma } from "@/libs/prisma"

export async function GET () {
  const comment = await prisma.commentReply.findMany({
    orderBy: [
      {
        tanggal: 'asc',
      },
    ],
  })
  return Response.json(comment)
}

export async function POST (req) {
  const { nama, content, user, comment } = await req.json()
  const addComment = await prisma.commentReply.create({
    data: {
      nama,
      content,
      user: {
        connect:
        {
          id: user
        }
      },
      comment:{
        connect:{
          id: comment
        }
      }      
    }
  })
  return Response.json(addComment)
}