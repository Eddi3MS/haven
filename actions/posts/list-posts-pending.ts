"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

export async function listPostsPending() {
  const user = await currentUser()

  if (!user || user.role !== "ADMIN") {
    return redirect("/login")
  }

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
          phone: true,
        },
      },
    },
  })

  const safeData = data.map((listing) => ({
    ...listing,
    createdAt: listing.createdAt.toISOString(),
    user: {
      name: listing.user.name!,
      email: listing.user.email!,
      phone: listing.user.phone!,
    },
  }))

  return safeData
}
