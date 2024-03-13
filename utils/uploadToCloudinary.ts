import { deleteFromCloudinaryWithDeleteToken } from "./deleteFromCloudinaryWithDeleteToken"

type UploadToCloudinaryProps = {
  signature: string
  images: File[]
  timestamp: number
}

type CloudinaryReturn = {
  public_id: string
  delete_token: string
  format: string
  original_filename: string
}

export type UploadToCloudinaryReturn = {
  public_id: string
  delete_token: string
  name: string
}

export async function uploadToCloudinary({
  signature,
  images,
  timestamp,
}: UploadToCloudinaryProps) {
  let imageData: UploadToCloudinaryReturn[] = []

  try {
    for (const image of images) {
      const formData = new FormData()

      formData.append("file", image)
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!)
      formData.append("timestamp", String(timestamp))
      formData.append("signature", signature)

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      )

      if (!res.ok) {
        throw new Error("Upload Failed.")
      }

      const { delete_token, public_id, format, original_filename } =
        (await res.json()) as CloudinaryReturn

      imageData.push({
        delete_token,
        public_id,
        name: original_filename + "." + format,
      })
    }
  } catch (error) {
    if (imageData.length > 0) {
      Promise.all(
        imageData.map((data) =>
          deleteFromCloudinaryWithDeleteToken(data.delete_token)
        )
      )
    }

    imageData = []
  } finally {
    return imageData.length > 0 ? imageData : null
  }
}
