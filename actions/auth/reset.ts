"use server"

import { ActionReturnType } from "@/actions/types"
import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/data/tokens"
import { ResetSchema } from "@/schemas"
import * as z from "zod"

export const reset = async (
  values: z.infer<typeof ResetSchema>
): Promise<ActionReturnType> => {
  const validatedFields = ResetSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "E-mail inválido!" }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: "Usuário não encontrado!" }
  }

  const passwordResetToken = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  )

  return { success: "E-mail para mudar senha enviado!" }
}
