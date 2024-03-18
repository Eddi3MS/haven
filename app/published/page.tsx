import { listPostsByUser } from "@/actions/posts/list-by-user"
import { Pagination } from "@/components/pagination"
import PostsList from "@/components/post/posts-list"
import React from "react"

const Published = async ({
  searchParams,
}: {
  searchParams: { page?: string }
}) => {
  const { data, hasNextPage } = await listPostsByUser(searchParams)

  return (
    <>
      <div className="flex justify-between w-full py-4">
        <h1 className="text-2xl font-semibold text-center">Seus Imóveis</h1>
      </div>

      <PostsList posts={data} showActions hasNextPage={hasNextPage} />
    </>
  )
}

export default Published
