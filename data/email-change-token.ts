import { db } from "@/lib/db"
import "server-only"

export const getEmailChangeTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.emailChangeToken.findUnique({
      where: { token },
    })

    return verificationToken
  } catch {
    return null
  }
}

export const getEmailChangeTokenByEmail = async (old_email: string) => {
  try {
    const verificationToken = await db.emailChangeToken.findFirst({
      where: { old_email },
    })

    return verificationToken
  } catch {
    return null
  }
}
