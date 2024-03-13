"use server"

import { db } from "@/lib/db"
import { SafePostWithUser } from "@/types"

export async function listSinglePost(
  postId: string
): Promise<SafePostWithUser | null> {
  const data = await db.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      images: true,
      user: {
        select: {
          phone: true,
          name: true,
          email: true,
        },
      },
    },
  })

  if (!data) {
    return null
  }

  const safeData = {
    ...data,
    user: {
      name: data?.user.name!,
      email: data?.user.email!,
      phone: data?.user.phone!,
    },
    createdAt: data?.createdAt.toISOString(),
  }

  return safeData
}
