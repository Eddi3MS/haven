"use server"

import { ActionReturnType } from "@/actions/types"
import { getEmailChangeTokenByToken } from "@/data/email-change-token"
import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"

export const emailChange = async (token: string): Promise<ActionReturnType> => {
  if (!token) {
    return { error: "Parâmetro invalido!" }
  }

  const existingToken = await getEmailChangeTokenByToken(token)

  if (!existingToken) {
    return { error: "Token não existe!" }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: "Token expirado!" }
  }

  const existingUser = await getUserByEmail(existingToken.old_email)

  if (!existingUser) {
    return { error: "Usuário não existe!" }
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

  return { success: "E-mail atualizado!" }
}
