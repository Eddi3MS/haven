import { listPostsByUser } from "@/actions/posts/list-by-user"
import PostsList from "@/components/posts-list"
import React from "react"

const Published = async () => {
  const data = await listPostsByUser()
  return (
    <>
      <div className="flex justify-between w-full pt-8 pb-4">
        <h1 className="text-2xl font-semibold text-center">Seus Imóveis</h1>
      </div>

      <PostsList posts={data} />
    </>
  )
}

export default Published
