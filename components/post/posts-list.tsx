import { SafePost } from "@/types"
import Link from "next/link"
import { PostCard } from "./post-card"
import { Pagination } from "../pagination"

const PostsList = ({
  posts,
  showActions = false,
  hasNextPage = false,
}: {
  posts: SafePost[]
  showActions?: boolean
  hasNextPage?: boolean
}) => {
  if (!Array.isArray(posts) || posts.length <= 0) {
    return <p className="text-center">Nenhum imóvel encontrado.</p>
  }

  return (
    <>
      <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start fade-in">
        {posts.map((item) => {
          if (item.status !== "APPROVED" || showActions) {
            return <PostCard post={item} key={item.id} showActions />
          }

          return (
            <Link key={item.id} href={`/havens/${item.id}`} passHref>
              <PostCard post={item} />
            </Link>
          )
        })}
      </div>
      <Pagination hasNextPage={hasNextPage} />
    </>
  )
}

export default PostsList
