import { prisma } from "@/libs/prisma"

export async function GET(req, { params }) {
  const product = await prisma.product.findUnique({
    where: {
      id: Number((await params).id)
    }
  })
  return Response.json(product)
}

export async function PUT(req, { params }) {
  const formData = await req.formData();
  const title = formData.get("title")
  const content = formData.get("content")
  const publish = formData.get("publish")
  const productType = formData.get("productType")
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

  const getproduct = await prisma.product.update({
    where: {
      id: Number((await params).id)
    },
    data: {
      title,
      content,
      image: {
        set: arr2,
      },
      publish: Boolean(publish),
      productType: {
        update: {
          id: Number(productType)
        }
      },
      category: {
        set: arr.map(id => ({ id: Number(id) })),
      },
    },
    include: {
      category: true,
      productType: true,
      image: true
    }
  })
  return Response.json(getproduct)
}

export async function DELETE(req, { params }) {
  try {
    const removeproduct = await prisma.product.delete({
      where: {
        id: Number((await params).id)
      }
    })
    return Response.json(removeproduct)
  } catch (error) {
    return Response.json(error.message)
  }
}