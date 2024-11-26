import { auth } from "@/auth";
import { prisma } from "@/libs/prisma"

export async function GET() {
  const media = await prisma.mediaApplication.findMany({
    orderBy: {
      title: 'asc'
    },
    include: {
      image: true,
    }
  })
  return Response.json(media)
}

export async function POST(req) {
  const session = await auth()
  const formData = await req.formData();
  const title = formData.get("title")
  const content = formData.get("content")
  const publish = formData.get("publish")
  const image = formData.getAll("image")

  let arr;
  let connect = image.map(item => item)

  if (connect != '') {   
    arr = image[0].split(',').map((item) => {
      return { id: parseInt(item) }
    });
  } else {
    arr = []
  }

  const media = await prisma.mediaApplication.create({
    data: {
      title,
      content,
      publish: Boolean(publish),
      createdBy: {
        connect: {
          id: session.user.id
        }
      },
      image: { connect: arr },
    },
  })
  return Response.json(media)
}