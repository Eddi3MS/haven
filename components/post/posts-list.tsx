import { SafePost } from "@/types"
import { ReactNode } from "react"
import { Pagination } from "../pagination"
import PostsListEmpty from "./posts-list-empty"

const PostsList = ({
  posts,
  showActions = false,
  hasNextPage = false,
  children,
  keyExtractor,
}: {
  posts: SafePost[]
  showActions?: boolean
  hasNextPage?: boolean
  children: (post: SafePost) => ReactNode
  keyExtractor: (post: SafePost) => string
}) => {
  if (!Array.isArray(posts) || posts.length <= 0) {
    return <PostsListEmpty isPublished={showActions} />
  }

  return (
    <>
      <ul className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start fade-in">
        {posts.map((item) => (
          <li key={keyExtractor(item)}>{children(item)}</li>
        ))}
      </ul>
      <Pagination hasNextPage={hasNextPage} />
    </>
  )
}

export default PostsList
