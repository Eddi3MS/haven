"use client"

import { createPost } from "@/actions/posts/create-post"
import { generateSignedUrl } from "@/actions/posts/generate-signed-url"
import { PostType } from "@/schemas"
import { deleteFromCloudinaryWithDeleteToken } from "@/utils/deleteFromCloudinaryWithDeleteToken"
import { uploadToCloudinary } from "@/utils/uploadToCloudinary"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { toast } from "sonner"
import PostForm from "./post-form"

const CreatePostForm = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const keyRef = useRef(1)

  const onSubmit = async (values: PostType) => {
    if (values.variation !== "files") return

    try {
      setLoading(true)

      const timestamp = Math.round(new Date().getTime() / 1000)

      const signatureResponse = await generateSignedUrl(timestamp)

      if ("error" in signatureResponse) {
        toast.error("Erro ao conectar com o servidor.")
        return
      }

      const { signature } = signatureResponse

      const uploadResponse = await uploadToCloudinary({
        signature,
        timestamp,
        images: values.images,
      })

      if (!uploadResponse) {
        toast.error(
          "Erro ao fazer upload das imagens, tente novamente mais tarde."
        )
        return
      }

      const { images, variation, ...data } = values

      const createResponse = await createPost({
        ...data,
        images: uploadResponse.map((image) => ({
          public_id: image.public_id,
          name: image.name,
        })),
      })

      if ("error" in createResponse) {
        Promise.all(
          uploadResponse.map((data) =>
            deleteFromCloudinaryWithDeleteToken(data.delete_token)
          )
        )

        toast.error(createResponse.error)
        return
      }

      if (keyRef.current) keyRef.current++
      toast.success(createResponse.success)
      router.push("/published")
    } catch (error: any) {
      toast.error(
        error?.message ||
          error?.data?.message ||
          "Algo deu errado. Tente novamente mais tarde."
      )
    } finally {
      setLoading(false)
    }
  }

  return <PostForm loading={loading} onSubmit={onSubmit} key={keyRef.current} />
}

export default CreatePostForm
