import { saltAndHashPassword } from "@/components/Utils";
import { prisma } from "@/libs/prisma";

export async function PUT(req, { params }) {
  const data = await req.json()
  const { username, name, email, akses, password} = data;
  const hashPassword = saltAndHashPassword(password)
  const getUser = await prisma.user.update({
    where: {
      id: String((await params).id)
    },   
    data: {
      username,
      name,
      email,
      akses,
      password: hashPassword,   
    }
  })
  return Response.json(getUser)
}
