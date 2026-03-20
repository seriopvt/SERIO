import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"

// This file contains the auth configuration that is safe to use in Edge Runtime
// (middleware). It does NOT import Prisma or any Node.js-only modules.

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      // authorize is only called server-side, but we need a placeholder here
      // The actual authorize logic is in auth.ts
      authorize: () => null,
    }),
  ],

  session: {
    strategy: "jwt" as const,
  },

  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig
