import { prisma } from "@/libs/prisma"

export async function GET(req, { params }) {
  const component = await prisma.component.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(component)
}

export async function PUT(req, { params }) {
  const formData = await req.formData()
  const id = Number((await params).id)
  const title = formData.get('title')
  const content = formData.get('content')
  const region = formData.get('region')
  const image = formData.getAll('image')
  const page = formData.get('page')
  const urutan = formData.get('urutan')
  let arr;
  let connect = image.map(item => item)
  if (connect != '') {
    arr = image[0].split(',').map((item) => {
      return { id: parseInt(item) }
    });
  } else {
    arr = []
  }
  const getcomponent = await prisma.component.update({
    where: {
      id: Number((await params).id)
    },
    data: {
      title,
      content,
      image: { set: arr },
      urutan: Number(urutan),
      region,
      page
    }
  })
  return Response.json(getcomponent)
}

export async function DELETE(req, { params }) {
  try {
    const removecomponent = await prisma.component.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removecomponent)
  } catch (error) {
    return Response.json(error.message)
  }
}