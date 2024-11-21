import { prisma } from "@/libs/prisma"

export async function GET() {
  const component = await prisma.component.findMany({
    include: {
      image: true
    }
  })
  return Response.json(component)
}

export async function POST(req) {
  const uruts = await prisma.component.findMany()
  const urut = uruts.length + 1
  const formData = await req.formData()
  const title = formData.get('title')
  const content = formData.get('content')
  const region = formData.get('region')
  const image = formData.getAll('image')
  const page = formData.get('page')

  // console.log('img',image)
  let arr;
  let connect = image.map(item => item)

  if (connect != '') {   
    arr = image[0].split(',').map((item) => {
      return { id: parseInt(item) }
    });
  } else {
    arr = []
  }
  console.log('arr',arr)

  const component = await prisma.component.create({
    data: {
      title,
      content,
      image: { connect: arr },
      urutan: urut,
      region,
      page
    },
  })
  return Response.json(component)
}