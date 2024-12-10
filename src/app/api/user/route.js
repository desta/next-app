import { saltAndHashPassword } from "@/utils/Utils";
import { prisma } from "@/libs/prisma";
import { auth } from "@/auth"

export const GET = auth(async function GET(req) {
  if (req.auth) {
    const user = await prisma.user.findMany({
      orderBy: [
        {
          username: "asc",
        },
      ],
    });
    return Response.json(user);
  }
  else {
    return Response.json('Not authenticated')
  }
}
)

// export async function GET() {
//   const user = await prisma.user.findMany({
//     orderBy: [
//       {
//         username: "asc",
//       },
//     ],
//   });

//   return Response.json(user);
// }

export async function POST(req) {
  try {
    const data = await req.json();
    const { email, username, name, password, akses } = data;
    const hashPassword = saltAndHashPassword(password)
    if (akses === "Administrator") {
      const newUser = await prisma.user.create({
        data: {
          username,
          name,
          email,
          akses: akses || "User",
          password: hashPassword,
          image: "",
        },
      });
      return Response.json(newUser);
    } else {
      const newUser = await prisma.user.create({
        data: {
          username,
          name,
          email,
          akses: akses || "User",
          password: hashPassword,
          image: "",
        },
      });
      return Response.json(newUser);
    }
  } catch (error) {
    console.log('Create user failed', error);
  }
}