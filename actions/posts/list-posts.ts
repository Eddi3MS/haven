"use server"

import { db } from "@/lib/db"
import { SearchParamsType } from "@/schemas"

export async function listPosts(search: SearchParamsType) {
  const { bathroomCount, bedroomCount, category } = search

  let query: any = {}

  if (category) {
    query.category = category
  }

  if (bathroomCount) {
    query.bathroomCount = {
      gte: +bathroomCount,
    }
  }
  if (bedroomCount) {
    query.bedroomCount = {
      gte: +bedroomCount,
    }
  }

  const data = await db.post.findMany({
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

  return safeData
}
