import { prisma } from "@/libs/prisma"
import { getErrorApi } from "@/utils/getResponseData"

export async function GET() {
  const productCategory = await prisma.productCategory.findMany({
    include: {
      productType: true,
    }
  })
  return Response.json(productCategory)
}

export async function POST(req) {
  try {
    const { productType, category } = await req.json()
    const productCategory = await prisma.productCategory.create({
      data: {
        productType: {
          connect: {
            id: Number(productType)
          }
        },
        category,
      }
    })
    return Response.json(productCategory)
  } catch (e) {
    console.error("Error masukin category", e.code, e.message);
    const hasilPesan = getErrorApi(e.code, e.message);
    return Response.json(
      { error: hasilPesan },
      { status: 500 }
    );
  }

}