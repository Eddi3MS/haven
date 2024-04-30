"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import {
  ServerValidationCreatePost,
  ServerValidationPostCreateType,
} from "@/schemas"
import { revalidatePath } from "next/cache"
import { ActionReturnType } from "../types"

export const createPost = async (
  values: ServerValidationPostCreateType
): Promise<ActionReturnType> => {
  const validatedFields = ServerValidationCreatePost.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Parâmetros inválidos!" }
  }

  const user = await currentUser()

  if (!user || !user?.id) {
    return { error: "Faça login!" }
  }

  if (!user?.phone) {
    return { error: "Cadastre um telefone de contato!" }
  }

  const { price, bathroomCount, bedroomCount, images, ...rest } =
    validatedFields.data

  await db.post.create({
    data: {
      ...rest,
      bathroomCount: +bathroomCount,
      bedroomCount: +bedroomCount,
      price: +price,
      userId: user.id,
      images: {
        createMany: {
          data: images.map((image) => ({
            publicId: image.public_id,
            name: image.name,
          })),
        },
      },
    },
  })

  revalidatePath("/admin")
  return { success: "Anuncio bem sucedido!!" }
}
