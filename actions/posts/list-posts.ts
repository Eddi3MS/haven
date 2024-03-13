"use server"

import { db } from "@/lib/db"
import { UrlSearchParamsType, SearchServerSchema } from "@/schemas"

export async function listPosts(search: UrlSearchParamsType) {
  const parsedData = SearchServerSchema.safeParse(search)

  let parsed: any = {}

  let currentPage = 1
  const pageSize = 6

  if (parsedData.success) {
    parsed = parsedData.data
  }

  let query: any = {}

  if (parsed.page) {
    currentPage = parsed.page
  }

  if (parsed.category) {
    query.category = parsed.category
  }

  if (parsed.bathroomCount) {
    query.bathroomCount = {
      gte: +parsed.bathroomCount,
    }
  }

  if (parsed.bedroomCount) {
    query.bedroomCount = {
      gte: +parsed.bedroomCount,
    }
  }

  const totalCount = await db.post.count({
    where: {
      status: "APPROVED",
      ...query,
    },
  })

  const hasNextPage = currentPage * pageSize < totalCount

  const data = await db.post.findMany({
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    where: {
      status: "APPROVED",
      ...query,
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

  return { data: safeData, hasNextPage }
}
