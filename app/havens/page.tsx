import { listPosts } from "@/actions/posts/list-posts"
import { Filters } from "@/components/post/filter"
import { PostCard } from "@/components/post/post-card"
import PostsList from "@/components/post/posts-list"
import { UrlSearchParamsType } from "@/schemas"
import Link from "next/link"

export const metadata = {
  title: "Imóveis - Haven SA",
  description: "O imóvel dos seus sonhos esta aqui.",
}

const Havens = async ({
  searchParams,
}: {
  searchParams: UrlSearchParamsType
}) => {
  const data = await listPosts(searchParams)

  return (
    <>
      <div className="flex justify-between w-full py-4 fade-in">
        <h1 className="text-2xl font-semibold text-center">Imóveis</h1>

        <Filters searchParams={searchParams} />
      </div>

      <PostsList
        posts={data.data}
        hasNextPage={data.hasNextPage}
        keyExtractor={(post) => post.id}
      >
        {(item) => {
          return (
            <Link key={item.id} href={`/havens/${item.id}`} passHref>
              <PostCard post={item} />
            </Link>
          )
        }}
      </PostsList>
    </>
  )
}

export default Havens
