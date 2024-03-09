"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

export async function listPostsByUser() {
  const user = await currentUser()

  if (!user?.id) {
    return redirect("/")
  }

  const data = await db.post.findMany({
    where: {
      userId: user.id,
    },
    include: {
      images: true,
    },
  })

  const safeData = data.map((listing) => ({
    ...listing,
    createdAt: listing.createdAt.toISOString(),
  }))

  return safeData
}
