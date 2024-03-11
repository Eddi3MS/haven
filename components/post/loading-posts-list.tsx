import { LoadingPostCard } from "./loading-post-card"

export const LoadingPostsList = () => {
  return (
    <>
      <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {Array.from({ length: 6 }).map((_, i) => {
          return <LoadingPostCard key={i} />
        })}
      </div>
      <div className="flex gap-2 justify-center py-4">
        <div className="h-9 w-9 bg-gray-300 rounded-md" />
        <div className="h-9 w-9 bg-gray-300 rounded-md" />
        <div className="h-9 w-9 bg-gray-300 rounded-md" />
      </div>
    </>
  )
}
