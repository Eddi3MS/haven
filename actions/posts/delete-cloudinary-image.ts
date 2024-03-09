"use server"
import { cloudinary } from "@/lib/cloudinary"
import { ActionReturnType } from "../types"

export async function deleteCloudinaryImage(
  imagesId: string[]
): Promise<ActionReturnType> {
  try {
    await cloudinary.api.delete_resources(imagesId, {
      type: "upload",
      resource_type: "image",
    })

    return { success: "Images deleted." }
  } catch (error) {
    return { error: "Error trying to delete images from cloudinary" }
  }
}
