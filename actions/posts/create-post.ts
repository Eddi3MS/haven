"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { PostHavenServerSchema } from "@/schemas"
import { z } from "zod"
import { ActionReturnType } from "../types"
import { revalidatePath } from "next/cache"

export const createPost = async (
  values: z.infer<typeof PostHavenServerSchema>
): Promise<ActionReturnType> => {
  const validatedFields = PostHavenServerSchema.safeParse(values)
  const user = await currentUser()

  if (!validatedFields.success) {
    return { error: "Parâmetros inválidos!" }
  }

  if (!user) {
    return { error: "Faça login!" }
  }

  if (!user?.phone) {
    return { error: "Cadastre um telefone de contato!" }
  }

  const {
    images,
    price,
    address,
    area,
    bathroomCount,
    bedroomCount,
    builtArea,
    category,
    description,
    title,
  } = values

  await db.post.create({
    data: {
      address,
      area: +area,
      builtArea: +builtArea,
      bathroomCount: +bathroomCount,
      bedroomCount: +bedroomCount,
      category,
      description,
      title,
      price: +price,
      userId: user.id,
      images: {
        createMany: {
          data: images.map((publicId) => ({
            publicId,
          })),
        },
      },
    },
  })

  revalidatePath("/admin")
  return { success: "Anuncio bem sucedido!!" }
}
