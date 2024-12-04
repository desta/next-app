import { prisma } from "@/libs/prisma";
import { saltAndHashPassword } from "@/utils/Utils";

export async function PUT(req, { params }) {
  const data = await req.json()
  const { password, akses } = data;

  let hashPassword
  if (password) {
    // const salt = await bcrypt.genSalt(10)
    hashPassword = saltAndHashPassword(password)
  }

  if (akses === "Administrator") {
    const newUser = await prisma.user.update({
      where: {
        id: (await params).id,
      },
      data: {
        ...data,
        password: hashPassword,
      },
    });
    return Response.json(newUser);
  } else {
    const newUser = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        ...data,
        password: hashPassword,
      },
    });
    return Response.json(newUser);
  }
}


export async function GET(req, { params }) {
  const user = await prisma.user.findUnique({
    where: {
      id: String(myId)
    }
  })
  return Response.json(user)
}

export async function DELETE(req, { params }) {
  try {
    const removeUser = await prisma.user.delete({
      where: {
        id: String((await params).id)
      }
    })
    return Response.json(removeUser)
  } catch (error) {
    return Response.json(error.message)
  }
}