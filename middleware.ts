import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"

// Use the edge-safe auth config (no Prisma/Node.js dependencies)
const { auth } = NextAuth(authConfig)

export default auth((req) => {
  if (!req.auth) {
    const loginUrl = new URL("/login", req.url)
    return Response.redirect(loginUrl)
  }
})

export const config = {
  matcher: ["/home/:path*"],
}