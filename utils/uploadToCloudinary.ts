type UploadToCloudinaryProps = {
  signature: string
  images: File[]
  timestamp: number
}

const baseURL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`

export async function uploadToCloudinary({
  signature,
  images,
  timestamp,
}: UploadToCloudinaryProps) {
  let imageData = []

  try {
    for (const image of images) {
      const formData = new FormData()

      formData.append("file", image)
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!)
      formData.append("timestamp", String(timestamp))
      formData.append("signature", signature)
      // formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");

      const res = await fetch(`${baseURL}/upload`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Upload Failed.")
      }

      const { delete_token, url } = (await res.json()) as {
        url: string
        delete_token: string
      }

      imageData.push({ delete_token, url })
    }
  } catch (error) {
    if (imageData.length > 0) {
      Promise.all(
        imageData.map((data) =>
          fetch(`${baseURL}/delete_by_token`, {
            method: "POST",
            body: JSON.stringify({ token: data.delete_token }),
          })
        )
      )
    }

    imageData = []
  }

  return imageData.length > 0 ? imageData.map((image) => image.url) : null
}
