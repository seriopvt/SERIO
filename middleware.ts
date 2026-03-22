import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"
import { NextResponse } from "next/server"

// Use the edge-safe auth config (no Prisma/Node.js dependencies)
const { auth } = NextAuth(authConfig)

export default auth((req) => {
  if (!req.auth) {
    const { pathname } = req.nextUrl

    // API routes → JSON 401 (don't redirect browsers away from API calls)
    if (pathname.startsWith("/api/recipes")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // App routes → redirect to login page
    const loginUrl = new URL("/login", req.url)
    return Response.redirect(loginUrl)
  }
})

export const config = {
  matcher: [
    // Protect all app routes under /home
    "/home/:path*",
    // Protect all recipe API routes (auth + signup are excluded by specificity)
    "/api/recipes/:path*",
  ],
}