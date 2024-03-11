import { SafePost } from "@/types"
import Link from "next/link"
import { PostCard } from "./post-card"

const PostsList = ({
  posts,
  showStatus = false,
}: {
  posts: SafePost[]
  showStatus?: boolean
}) => {
  if (!Array.isArray(posts) || posts.length <= 0) {
    return <p className="text-center">Nenhum imóvel encontrado.</p>
  }

  return (
    <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
      {posts.map((item) => {
        if (item.status !== "APPROVED") {
          return <PostCard post={item} key={item.id} showStatus />
        }

        return (
          <Link key={item.id} href={`/havens/${item.id}`} passHref>
            <PostCard post={item} showStatus={showStatus} />
          </Link>
        )
      })}
    </div>
  )
}

export default PostsList
