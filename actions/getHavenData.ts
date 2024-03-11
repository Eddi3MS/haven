"use server"

import { db } from "@/lib/db"

export async function getHavenData() {
  const count = { REJECTED: 0, APPROVED: 0, PENDING: 0, SELL: 0, RENT: 0 }

  const statusCount = await db.post.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  })

  const categoryCount = await db.post.groupBy({
    by: ["category"],
    _count: {
      id: true,
    },
  })

  statusCount.forEach((post) => {
    if (post.status in count) {
      count[post.status] = post._count.id
    }
  })

  categoryCount.forEach((post) => {
    if (post.category in count) {
      count[post.category] = post._count.id
    }
  })

  return {
    rentCount: count.RENT,
    sellCount: count.SELL,
    rejectedCount: count.REJECTED,
    approvedCount: count.APPROVED,
    pendingCount: count.PENDING,
  }
}
