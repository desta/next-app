import { prisma } from "@/libs/prisma"

export async function GET() {
    const VisitorCounter = await prisma.homeCounter.findMany({
        include: {
            bulan: true,
            tahun: true,
        }
    })
    return Response.json(VisitorCounter)
}

export async function POST(req) {
    const data = await req.json()
    const { counter, bulan, tahun } = data;
    const getVisitorCounter = await prisma.homeCounter.create({
        data:
        {
            counter: counter,
            tahun: {
                connectOrCreate: {
                    where: {
                        tahun: parseInt(tahun)
                    },
                    create: {
                        tahun: parseInt(tahun)
                    }
                }
            },
            bulan: {
                connect: {
                    bulan: bulan
                },
            },
        },
        include:{
            tahun: true,
            bulan: true
        }
    })
    return Response.json(getVisitorCounter)
}

export async function PUT(req, { params }) {
    const data = await req.json()
    const { id, counter,  } = data;
    const getVisitorCounter = await prisma.homeCounter.update({
        where: {
          id: id  
        },
        data:
        {
            counter: counter,
        },
    })
    return Response.json(getVisitorCounter)
}