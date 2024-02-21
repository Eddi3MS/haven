"use server"

import { db } from "@/lib/db"

export async function listPosts() {
  const data = db.post.findMany({
    where: {
      status: "PENDING",
    },
    include: {
      images: true,
    },
  })

  return data
}
