"use server"

import * as z from "zod"
import { AuthError } from "next-auth"

import { db } from "@/lib/db"
import { signIn } from "@/auth"
import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/data/tokens"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
): Promise<
  { success: string } | { error: string } | { twoFactor: boolean } | undefined
> => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Parâmetro invalido!" }
  }

  const { email, password, code } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: "Usuário não existe!" }
  }

  if (!existingUser.email) {
    return { error: "E-mail não existe!" }
  }

  if (!existingUser.password) {
    return { error: "Faça login com o seu provider!" }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    )

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return { success: "E-mail com código de confirmação enviado!" }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

      if (!twoFactorToken) {
        return { error: "Código inválido!" }
      }

      if (twoFactorToken.token !== code) {
        return { error: "Código inválido!" }
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date()

      if (hasExpired) {
        return { error: "Código expirado!" }
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      )

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        })
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)

      return { twoFactor: true }
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciais inválidas!" }
        default:
          return { error: "Algo deu errado! Tente novamente mais tarde." }
      }
    }

    throw error
  }
}
