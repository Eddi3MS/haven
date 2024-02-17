import { db } from "@/lib/db"

export const getAllApprovedPosts = async () => {
  try {
    const posts = await db.post.findMany({ where: { status: "APPROVED" } })

    return posts
  } catch {
    return null
  }
}

export const getPostById = async (id: string) => {
  try {
    const post = await db.post.findUnique({ where: { id } })

    return post
  } catch {
    return null
  }
}
