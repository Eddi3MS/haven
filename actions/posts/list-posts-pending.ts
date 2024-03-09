"use server"

import { db } from "@/lib/db"

export async function listPostsPending() {
  const data = await db.post.findMany({
    where: {
      status: "PENDING",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })

  const safeData = data.map((listing) => ({
    ...listing,
    createdAt: listing.createdAt.toISOString(),
  }))

  return safeData
}
