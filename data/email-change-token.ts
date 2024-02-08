import { db } from '@/lib/db'

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

export const getEmailChangeTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.emailChangeToken.findFirst({
      where: { old_email: email },
    })

    return verificationToken
  } catch {
    return null
  }
}

