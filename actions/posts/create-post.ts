"use server"

import { PostHavenServerSchema } from "@/schemas"
import { z } from "zod"
import { ActionReturnType } from "../types"
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"

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

  const res = await db.post.create({
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

  console.log(res)

  return { success: "Anuncio bem sucedido!! " }
}
