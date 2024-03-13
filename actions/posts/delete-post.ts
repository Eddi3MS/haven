"use server"

import { deleteCloudinaryImage } from "@/actions/posts/delete-cloudinary-image"
import { ActionReturnType } from "@/actions/types"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function deletePost(postId: string): Promise<ActionReturnType> {
  const user = await currentUser()

  if (!user) {
    return { error: "Não autorizado." }
  }

  if (!postId || typeof postId !== "string") {
    return { error: "Id inválido." }
  }

  const post = await db.post.findUnique({
    where: { id: postId },
    include: {
      images: true,
    },
  })

  if (!post) {
    return { error: "Anuncio não encontrado." }
  }

  if (post.userId !== user.id || user.role !== "ADMIN") {
    return { error: "Não autorizado." }
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

  revalidatePath("/havens")
  revalidatePath("/admin")
  revalidatePath("/published")
  revalidatePath(`/havens/${postId}`)
  return { success: "Anuncio deletado." }
}
