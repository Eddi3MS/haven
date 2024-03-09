"use server"

import { ActionReturnType } from "@/actions/types"
import { update } from "@/auth"
import { getUserByEmail, getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { sendEmailChangeEmail } from "@/lib/mail"
import { generateEmailChangeToken } from "@/data/tokens"
import { SettingsSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import * as z from "zod"

export const settings = async (
  values: z.infer<typeof SettingsSchema>
): Promise<ActionReturnType> => {
  const parsedData = SettingsSchema.safeParse(values)

  if (!parsedData.success) {
    return { error: "Wrong data format." }
  }

  const parsedValues = parsedData.data

  const user = await currentUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { error: "Unauthorized" }
  }

  if (user.isOAuth) {
    parsedValues.email = undefined
    parsedValues.password = undefined
    parsedValues.newPassword = undefined
    parsedValues.isTwoFactorEnabled = undefined
  }

  if (parsedValues.email && parsedValues.email !== user.email) {
    const existingUser = await getUserByEmail(parsedValues.email)

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" }
    }

    const emailChangeToken = await generateEmailChangeToken(
      parsedValues.email,
      user.email!
    )
    await sendEmailChangeEmail(
      emailChangeToken.new_email,
      emailChangeToken.token
    )

    return { success: "Verification email sent!" }
  }

  if (parsedValues.password && parsedValues.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      parsedValues.password,
      dbUser.password
    )

    if (!passwordsMatch) {
      return { error: "Incorrect password!" }
    }

    const hashedPassword = await bcrypt.hash(parsedValues.newPassword, 10)
    parsedValues.password = hashedPassword
    parsedValues.newPassword = undefined
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...parsedValues,
    },
  })

  update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
    },
  })

  return { success: "Settings Updated!" }
}
