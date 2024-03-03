"use server"

import { db } from "@/lib/db"

export async function listSinglePost(postId: string) {
  const data = db.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      images: true,
      user: {
        select: {
          phone: true,
          name: true,
        },
      },
    },
  })

  return data
}
