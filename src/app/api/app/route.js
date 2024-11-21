"use server"
import { prisma } from "@/libs/prisma";

export async function GET () {
  const app = await prisma.app.findUnique({
    where: {
      id: 0
    },
  })
  
  return Response.json(app)
}