"use client"

import { generateSignedUrl } from "@/actions/posts/generate-signed-url"
import { updatePost } from "@/actions/posts/update-post"
import { PostType } from "@/schemas"
import { deleteFromCloudinaryWithDeleteToken } from "@/utils/deleteFromCloudinaryWithDeleteToken"
import { uploadToCloudinary } from "@/utils/uploadToCloudinary"
import { useRef, useState } from "react"
import { toast } from "sonner"
import PostForm from "./post-form"

const UpdatePostForm = ({ post }: { post: { data: PostType; id: string } }) => {
  const [loading, setLoading] = useState(false)
  const keyRef = useRef(1)
  const [data, setData] = useState<PostType>(post.data)

  const onSubmit = async (values: PostType) => {
    try {
      setLoading(true)

      /* atualizou outros campos que nao as imagens */
      if (values.variation !== "files") {
        const updateResponse = await updatePost(post.id, values)

        if ("error" in updateResponse) {
          toast.error(updateResponse.error)
          return
        }

        if (keyRef.current) keyRef.current++

        setData(values)
        toast.success(updateResponse.success)
        return
      }

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

      const updatedData = {
        ...data,
        images: uploadResponse.map((image) => ({
          public_id: image.public_id,
          name: image.name,
        })),
      }

      const updateResponse = await updatePost(post.id, updatedData, true)

      if ("error" in updateResponse) {
        Promise.all(
          uploadResponse.map((data) =>
            deleteFromCloudinaryWithDeleteToken(data.delete_token)
          )
        )
        toast.error(updateResponse.error)
        return
      }

      if (keyRef.current) keyRef.current++
      setData({ ...updatedData, variation: "ids" })
      toast.success(updateResponse.success)
      return
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

  return (
    <PostForm
      loading={loading}
      onSubmit={onSubmit}
      defaultValues={data}
      key={keyRef.current}
    />
  )
}

export default UpdatePostForm
