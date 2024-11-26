import { prisma } from "@/libs/prisma"

export async function GET(req, { params }) {
  const media = await prisma.mediaApplication.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(media)
}

export async function PUT(req, { params }) {
  const formData = await req.formData();
  const title = formData.get("title")
  const content = formData.get("content")
  const publish = formData.get("publish")
  const image = formData.getAll("image")

  let arr = image.map((item) => {
    return { id: parseInt(item) }
  });

  const getMedia = await prisma.mediaApplication.update({
    where: {
      id: Number((await params).id)
    },
    data: {
      title,
      content,
      image: {
        set: arr,
      },
      publish: Boolean(publish),
    },
    include: {
      image: true
    }
  })
  return Response.json(getMedia)
}

export async function DELETE(req, { params }) {
  try {
    const removeMedia = await prisma.mediaApplication.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removeMedia)
  } catch (error) {
    return Response.json(error.message)
  }
}