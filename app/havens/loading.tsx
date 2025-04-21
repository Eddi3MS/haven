import { LoadingPostsList } from "@/components/post/loading-posts-list"
import React from "react"

const Loading = () => {
  return (
    <section className="container">
      <div className="flex justify-between w-full py-4 animate-pulse">
        <div className="h-8 w-20 bg-gray-300" />

        <div className="h-8 w-20 bg-gray-300" />
      </div>

      <LoadingPostsList />
    </section>
  )
}

export default Loading
