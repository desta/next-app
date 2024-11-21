import { prisma } from "@/libs/prisma"

export async function GET(req, { params }) {
  const pages = await prisma.pages.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(pages)
}

export async function PUT(req, { params }) {
  const formData = await req.formData();
  const title = formData.get("title")
  const path = formData.get("path");
  const layout = formData.get("layout");
  const content = formData.get("content")
  const publish = formData.get("publish")
  const category = formData.getAll("category")
  const image = formData.getAll("image")

  let arr = category.map((item) => item.split(","));
  arr.map((item, index) => {
    item.map((item) => {
      arr[index] = parseInt(item)
    })
  })

  let arr2 = image.map((item) => {
    return { id: parseInt(item) }
  });

  const getpages = await prisma.pages.update({
    where: {
      id: Number((await params).id)
    },
    data: {
      title,
      path,
      layout,
      content,
      gallery: {
        set: arr2,
      },
      publish: Boolean(publish),
      category: {
        set: arr.map(id => ({ id: Number(id) })),
      },
    },
    include: {
      category: true,
      gallery: true
    }
  })
  return Response.json(getpages)
}

export async function DELETE(req, { params }) {
  try {
    const removepages = await prisma.pages.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removepages)
  } catch (error) {
    return Response.json(error.message)
  }
}