"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { PaginationSchema } from "@/schemas"
import { redirect } from "next/navigation"

export async function listPostsByUser({ page }: { page?: string }) {
  const user = await currentUser()

  if (!user?.id) {
    return redirect("/")
  }

  let currentPage = 1
  const pageSize = 6

  const parsedPage = PaginationSchema.safeParse(page)

  if (parsedPage.success) {
    currentPage = +parsedPage.data
  }

  const data = await db.post.findMany({
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    where: {
      userId: user.id,
    },
    include: {
      images: true,
    },
  })

  const totalCount = await db.post.count({
    where: {
      userId: user.id,
    },
  })

  const hasNextPage = currentPage * pageSize < totalCount

  const safeData = data.map((listing) => ({
    ...listing,
    createdAt: listing.createdAt.toISOString(),
  }))

  return { data: safeData, hasNextPage }
}
