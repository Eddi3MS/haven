"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import {
  ServerValidationCreatePost,
  ServerValidationPostCreateType,
} from "@/schemas"
import { revalidatePath } from "next/cache"
import { ActionReturnType } from "../types"
import { deleteCloudinaryImage } from "./delete-cloudinary-image"

export const updatePost = async (
  id: string,
  values: ServerValidationPostCreateType,
  updateImages: boolean = false
): Promise<ActionReturnType> => {
  const validatedFields = ServerValidationCreatePost.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Parâmetros inválidos!" }
  }
  const user = await currentUser()

  const dbPost = await db.post.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
      user: {
        select: {
          id: true,
        },
      },
    },
  })

  if (!dbPost) {
    return { error: "Anúncio não encontrado!" }
  }

  if (!user || user.id !== dbPost.user.id) {
    return { error: "Não autorizado!" }
  }

  const { bathroomCount, bedroomCount, price, images, ...rest } =
    validatedFields.data

  if (updateImages) {
    const oldImages = dbPost.images.reduce<{
      ids: string[]
      publicIds: string[]
    }>(
      (acc, curr) => {
        acc.ids.push(curr.id)
        acc.publicIds.push(curr.publicId)

        return acc
      },
      { ids: [], publicIds: [] }
    )

    await deleteCloudinaryImage(oldImages.publicIds)

    await db.image.deleteMany({
      where: {
        id: {
          in: oldImages.ids,
        },
      },
    })
  }

  await db.post.update({
    where: {
      id,
    },
    data: {
      ...rest,
      bathroomCount: +bathroomCount,
      bedroomCount: +bedroomCount,
      price: +price,
      ...(updateImages && {
        images: {
          createMany: {
            data: images.map((image) => ({
              publicId: image.public_id,
              name: image.name,
            })),
          },
        },
      }),
      status: "PENDING",
    },
  })

  revalidatePath("/admin")
  return { success: "Anuncio atualizado!!" }
}
