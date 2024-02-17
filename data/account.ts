import { db } from "@/lib/db"
import "server-only"

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId },
    })

    return account
  } catch {
    return null
  }
}
