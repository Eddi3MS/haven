"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { sendApprovedEmail, sendRejectedEmail } from "@/lib/mail"
import { ActionReturnType } from "../types"
import { revalidatePath } from "next/cache"

type updatePostStatusProps =
  | {
      postId: string
      status: "APPROVED"
    }
  | {
      postId: string
      status: "REJECTED"
      rejectReason: string
    }

export const updatePostStatus = async (
  data: updatePostStatusProps
): Promise<ActionReturnType> => {
  if (!data.postId || !data.status) {
    return { error: "Parâmetros inválidos!" }
  }

  const user = await currentUser()

  if (!user || user?.role !== "ADMIN") {
    return { error: "Não autorizado." }
  }

  const dbPost = await db.post.findUnique({
    where: {
      id: data.postId,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  })

  if (!dbPost) {
    return { error: "Imóvel não encontrado!" }
  }

  await db.post.update({
    where: { id: dbPost.id },
    data: {
      status: data.status,
    },
  })

  if (data.status === "APPROVED") {
    sendApprovedEmail(dbPost.user.email!, dbPost.id)
  }

  if (data.status === "REJECTED") {
    sendRejectedEmail(dbPost.user.email!, data.rejectReason)
  }

  revalidatePath("/admin")
  return { success: "Anuncio atualizado com sucesso!!" }
}
