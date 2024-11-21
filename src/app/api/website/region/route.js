import { prisma } from "@/libs/prisma"

export async function GET () {
  const region = await prisma.region.findMany({
    orderBy: [
      {
        region: 'asc',
      },
    ],
  })
  return Response.json(region)
}

export async function POST (req) {
  const { region } = await req.json()
  const regionPOST = await prisma.region.create({
    data: {
      region
    }
  })
  return Response.json(regionPOST)
}