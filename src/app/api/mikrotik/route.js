import { prisma } from "@/libs/prisma"

export async function GET() {
  const mikrotik = await prisma.mikrotik.findMany()
  const fetchMikrotik = await fetch(`http://${mikrotik[0].ip}/rest/system/resource`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Basic ` + `${Buffer.from(`${mikrotik[0].username}:${mikrotik[0].password}`).toString('base64')}`
    }
  })
  .then(response => response.json())
  .then(data => {
    return data
  })
  console.log("fetchMikrotik",fetchMikrotik)

  return Response.json(fetchMikrotik)
}

export async function POST (req) {
  const { ip, username, password } = await req.json()
  const mikrotik = await prisma.mikrotik.create({
    data: {
      ip,
      username,
      password
    }
  })
  return Response.json(mikrotik)
}