import { listPostsPending } from "@/actions/posts/list-posts-pending"
import { PostsPendingList } from "@/components/post/posts-pending-list"

const AdminPage = async () => {
  const data = await listPostsPending()

  return (
    <>
      <div className="flex justify-between w-full py-4 fade-in">
        <h1 className="text-2xl font-semibold text-center">
          Pendentes de Aprovação:
        </h1>
      </div>
      <PostsPendingList data={data} />
    </>
  )
}

export default AdminPage
