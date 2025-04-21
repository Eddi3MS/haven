"use server"

import { db } from "@/lib/db"

export async function listPostsFeatured() {
  const data = await db.post.findMany({
    take: 3,
    where: {
      isFeatured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: true,
    },
  })

  const safeData = data.map((listing) => ({
    ...listing,
    createdAt: listing.createdAt.toISOString(),
  }))

  return { data: safeData }
}
