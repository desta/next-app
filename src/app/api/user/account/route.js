import { auth } from "@/auth"
import { prisma } from "@/libs/prisma"

export async function GET(req, res) {
  const session = await auth()
  const myId = session?.user.id

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: myId
      }
    })
    return Response.json(user)
  } catch (error) {
    return new Response({error: "Database Error"}, { status: 500 });
  }
}
