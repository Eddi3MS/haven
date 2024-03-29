import { SafePost } from "@/types"
import Link from "next/link"
import { Pagination } from "../pagination"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { PostCard } from "./post-card"
import PostsListEmpty from "./posts-list-empty"

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
    return <PostsListEmpty isPublished={showActions} />
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
