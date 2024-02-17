"use server"

import { deleteCloudinaryImage } from "@/actions/delete-cloudinary-image"
import { ActionReturnType } from "@/actions/types"
import { getPostById } from "@/data/posts"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export async function deletePost(postId: string): Promise<ActionReturnType> {
  const user = await currentUser()

  if (!user) {
    return { error: "Not Authorized." }
  }

  if (!postId || typeof postId !== "string") {
    return { error: "Invalid post ID." }
  }

  const post = await getPostById(postId)

  if (!post) {
    return { error: "Post not found." }
  }

  if (post.userId !== user.id && user.role !== "ADMIN") {
    return { error: "Not Authorized." }
  }

  await db.post
    .deleteMany({
      where: {
        id: postId,
        userId: user.id,
      },
    })
    .then((result) => {
      console.log(result)
    })

  await deleteCloudinaryImage(post.imageId)

  return { success: "Post deleted." }
}
