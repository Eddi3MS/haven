import { listSinglePost } from "@/actions/posts/list-single-post"
import UpdatePostForm from "@/components/post/update-post-form"
import React from "react"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const post = await listSinglePost(id)

  if (!post) {
    return <p>anuncio não encontrado.</p>
  }

  return (
    <UpdatePostForm
      post={{
        data: {
          address: post.address,
          area: String(post.area),
          bathroomCount: String(post.bathroomCount),
          bedroomCount: String(post.bedroomCount),
          builtArea: String(post.builtArea),
          price: String(post.price),
          category: post.category,
          description: post.description,
          images: post.images.map((image) => ({
            name: image.name || "file.jpg",
            public_id: image.publicId,
          })),
          title: post.title,
          variation: "ids",
        },
        id,
      }}
    />
  )
}

export default Page
