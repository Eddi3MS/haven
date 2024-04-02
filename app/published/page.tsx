import { listPostsByUser } from "@/actions/posts/list-by-user"
import { PostCard } from "@/components/post/post-card"
import PostsList from "@/components/post/posts-list"
import PublishedStore from "@/components/published-store"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Seus Anúncios - Haven SA",
  description: "Sua lista completa de anúncios.",
}

const Published = async ({
  searchParams,
}: {
  searchParams: { page?: string }
}) => {
  const { data, hasNextPage } = await listPostsByUser(searchParams)

  return (
    <>
      <PublishedStore published={data} />
      <div className="flex justify-between w-full py-4">
        <h1 className="text-2xl font-semibold text-center">Seus Anúncios</h1>
      </div>

      <PostsList
        posts={data}
        showActions
        hasNextPage={hasNextPage}
        keyExtractor={(post) => post.id}
      >
        {(item) => {
          return <PostCard post={item} key={item.id} showActions />
        }}
      </PostsList>
    </>
  )
}

export default Published
