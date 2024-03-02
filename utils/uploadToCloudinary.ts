import { deleteFromCloudinaryWithDeleteToken } from "./deleteFromCloudinaryWithDeleteToken"

type UploadToCloudinaryProps = {
  signature: string
  images: File[]
  timestamp: number
}

type ImagesReturn = {
  public_id: string
  delete_token: string
}

export async function uploadToCloudinary({
  signature,
  images,
  timestamp,
}: UploadToCloudinaryProps) {
  let imageData: ImagesReturn[] = []

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

      const { delete_token, public_id } = (await res.json()) as ImagesReturn

      imageData.push({ delete_token, public_id })
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
