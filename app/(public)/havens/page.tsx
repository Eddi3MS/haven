import { listPosts } from "@/actions/posts/list-posts"
import { Filters } from "@/components/filter"
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

      <PostsList posts={data} />
    </>
  )
}

export default Havens
