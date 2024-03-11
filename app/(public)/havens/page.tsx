import { listPosts } from "@/actions/posts/list-posts"
import { Pagination } from "@/components/pagination"
import { Filters } from "@/components/post/filter"
import PostsList from "@/components/post/posts-list"
import { SearchParamsType } from "@/schemas"

const Havens = async ({ searchParams }: { searchParams: SearchParamsType }) => {
  const data = await listPosts(searchParams)
  return (
    <>
      <div className="flex justify-between w-full py-4">
        <h1 className="text-2xl font-semibold text-center">Imóveis</h1>

        <Filters searchParams={searchParams} />
      </div>
      <PostsList posts={data.data} />
      <Pagination searchParams={searchParams} hasNextPage={data.hasNextPage} />
    </>
  )
}

export default Havens
