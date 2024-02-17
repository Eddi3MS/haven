import { db } from "@/lib/db"
import "server-only"

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    })

    return twoFactorConfirmation
  } catch {
    return null
  }
}
