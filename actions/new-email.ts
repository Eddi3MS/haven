'use server'

import { getEmailChangeTokenByToken } from '@/data/email-change-token'
import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'

export const emailChange = async (
  token: string
): Promise<{ success: string } | { error: string }> => {
  const existingToken = await getEmailChangeTokenByToken(token)

  if (!existingToken) {
    return { error: 'Token does not exist!' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'Token has expired!' }
  }

  const existingUser = await getUserByEmail(existingToken.old_email)

  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.new_email,
    },
  })

  await db.emailChangeToken.delete({
    where: { id: existingToken.id },
  })

  return { success: 'Email changed!' }
}

