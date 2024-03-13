import { LoadingPostsList } from "@/components/post/loading-posts-list"
import React from "react"

const Loading = () => {
  return (
    <>
      <div className="flex justify-between w-full py-4 animate-pulse">
        <div className="h-9 w-32 bg-gray-300" />
      </div>

      <LoadingPostsList />
    </>
  )
}

export default Loading
