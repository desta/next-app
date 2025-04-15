import { prisma } from "@/libs/prisma";
import { saltAndHashPassword } from "@/utils/Utils";

export async function PUT(req, { params }) {
  const data = await req.json();
  const { password, akses } = data;

  let hashPassword;
  if (password !== undefined) {
    hashPassword = saltAndHashPassword(password)
    const updateUser = await prisma.user.update({
      where: {
        id: await params.id,
      },
      data: {
        ...data,
        password: hashPassword,
        akses: {
          // set: akses.map((item) => {
          //   return { where: { akses: item }, create: { akses: item } };
          // })
          set: akses.map(akses => ({ akses: akses }))
        },
      },
      include: {
        akses: true,
      }
    });
    return Response.json(updateUser);
  }
  else {
    const updateUser = await prisma.user.update({
      where: {
        id: await params.id,
      },
      data: {
        ...data,
        password: undefined,
        akses: {
          set: akses.map(akses => ({ akses: akses }))
        },
      },
      include: {
        akses: true,
      }
    });
    return Response.json(updateUser);
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