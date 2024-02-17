"use server"
import { cloudinary } from "@/lib/cloudinary"

export async function deleteCloudinaryImage(imageId: string) {
  const res = await cloudinary.uploader.destroy(imageId)

  console.log(res)

  /* checar resposta, tratar possivel erro */
  return
  return { success: "Image deleted." }

  return { error: "Failed to delete image." }
}
