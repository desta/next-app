import { prisma } from "@/libs/prisma"
import { getErrorApi } from "@/utils/getResponseData"

export async function GET() {
  const pagesCategory = await prisma.pagesCategory.findMany()
  return Response.json(pagesCategory)
}

export async function POST(req) {
  try {
    const { category } = await req.json()
    const pagesCategory = await prisma.pagesCategory.create({
      data: {
        category,
      }
    })
    return Response.json(pagesCategory)
  } catch (e) {
    console.error("Error masukin category", e.code, e.message);
    const hasilPesan = getErrorApi(e.code, e.message);
    return Response.json(
      { error: hasilPesan },
      { status: 500 }
    );
  }

}