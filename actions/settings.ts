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
  const user = await currentUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { error: "Unauthorized" }
  }

  if (dbUser.role === "USER" && values.role === "ADMIN") {
    return { error: "Unauthorized" }
  }

  if (user.isOAuth) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email)

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" }
    }

    const emailChangeToken = await generateEmailChangeToken(
      values.email,
      user.email!
    )
    await sendEmailChangeEmail(
      emailChangeToken.new_email,
      emailChangeToken.token
    )

    return { success: "Verification email sent!" }
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    )

    if (!passwordsMatch) {
      return { error: "Incorrect password!" }
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10)
    values.password = hashedPassword
    values.newPassword = undefined
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  })

  update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      role: updatedUser.role,
    },
  })

  return { success: "Settings Updated!" }
}
