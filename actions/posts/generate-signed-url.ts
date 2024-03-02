"use server"

import { currentUser } from "@/lib/auth"
import { cloudinary } from "@/lib/cloudinary"

export const generateSignedUrl = async (
  timestamp: number
): Promise<
  | {
      signature: string
    }
  | { error: string }
> => {
  const user = currentUser()

  if (!user) {
    return { error: "Not Authorized" }
  }

  const signature = cloudinary.utils.api_sign_request(
    { timestamp },
    process.env.CLOUDINARY_API_SECRET!
  )

  if (!signature) {
    return { error: "Error generating the sign url" }
  }

  return {
    signature,
  }
}
