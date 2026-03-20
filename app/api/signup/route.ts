import { db } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  const { name, email, password } = await req.json()

  const existing = await db.user.findUnique({
    where: { email },
  })

  if (existing) {
    return Response.json({ error: "User exists" }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 10)

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashed,
    },
  })

  return Response.json({ id: user.id })
}