import { UserRole } from "@prisma/client"
import NextAuth, { type DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole
  isTwoFactorEnabled: boolean
  isOAuth: boolean
  phone: string | null
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}
