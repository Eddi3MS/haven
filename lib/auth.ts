import { auth } from "@/auth"
import "server-only"

export const currentUser = async () => {
  const session = await auth()

  return session?.user
}
