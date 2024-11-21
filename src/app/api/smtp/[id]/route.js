import { prisma } from "@/libs/prisma"
import { encrypt } from "@/utils/ChiperText"

export async function GET(req, { params }) {
  const smtp = await prisma.smtp.findUnique({
    where: {
      id: 0
    }
  })
  return Response.json(smtp)
}

export async function PUT(req, { params }) {
  const data = await req.json()
  const { password } = data
  const hash = encrypt(password)
  const getSmtp = await prisma.smtp.update({
    where: {
      id: 0
    },
    data: {
      ...data,
      password: hash
    }
  })
  return Response.json(getSmtp)
}

export async function DELETE(req, { params }) {
  try {
    const removeSmtp = await prisma.smtp.delete({
      where: {
        id: 0
      }
    })
    return Response.json(removeSmtp)
  } catch (error) {
    return Response.json(error.message)
  }
}