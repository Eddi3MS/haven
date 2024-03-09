"use server"

import { deleteCloudinaryImage } from "@/actions/posts/delete-cloudinary-image"
import { ActionReturnType } from "@/actions/types"
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

  const post = await db.post.findUnique({
    where: { id: postId },
    include: {
      images: true,
    },
  })

  if (!post) {
    return { error: "Post not found." }
  }

  if (post.userId !== user.id || user.role !== "ADMIN") {
    return { error: "Not Authorized." }
  }

  const imagesResp = await deleteCloudinaryImage(
    post.images.map((image) => image.publicId)
  )

  if ("error" in imagesResp) {
    return { error: "Falha ao deletar imagens do bucket." }
  }

  await db.post.deleteMany({
    where: {
      id: postId,
      userId: user.id,
    },
  })

  return { success: "Post deleted." }
}
