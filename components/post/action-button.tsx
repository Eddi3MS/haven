"use client"
import { updatePostStatus } from "@/actions/posts/update-post-status"
import { useState } from "react"
import { BiLoader } from "react-icons/bi"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { deletePost } from "@/actions/posts/delete-post"

export const ActionButton = ({
  postId,
  type,
  onActionSuccess,
}: {
  postId: string
  type: "APPROVE" | "REJECT" | "DELETE"
  onActionSuccess: (postId: string) => void
}) => {
  const [loading, setLoading] = useState(false)

  const handleApprove = async () => {
    setLoading(true)
    const res = await updatePostStatus({
      postId,
      status: "APPROVED",
    })

    setLoading(false)
    if ("error" in res) {
      return toast.error(res.error)
    }

    onActionSuccess(postId)
    return toast.success(res.success)
  }

  const handleDelete = async () => {
    setLoading(true)
    const res = await deletePost(postId)

    setLoading(false)

    if ("error" in res) {
      return toast.error(res.error)
    }

    onActionSuccess(postId)
    return toast.success(res.success)
  }

  const handleReject = async () => {
    setLoading(true)

    const rejectReason = prompt("Insira a razão da rejeição:")

    if (!rejectReason) {
      return
    }
    const res = await updatePostStatus({
      postId,
      status: "REJECTED",
      rejectReason,
    })

    setLoading(false)

    if ("error" in res) {
      return toast.error(res.error)
    }

    onActionSuccess(postId)
    return toast.success(res.success)
  }

  if (type === "DELETE") {
    return (
      <Button
        onClick={handleDelete}
        className="min-w-[85px]"
        aria-label={loading ? "deletando anúncio..." : "deletar anúncio?"}
      >
        {loading ? <BiLoader className="animate-spin" /> : "Deletar"}
      </Button>
    )
  }

  if (type === "REJECT") {
    return (
      <Button
        className="bg-red-500 hover:bg-red-600 min-w-[85px]"
        onClick={handleReject}
        aria-label={loading ? "rejeitando anúncio..." : "rejeitar anúncio?"}
      >
        {loading ? <BiLoader className="animate-spin" /> : "Rejeitar"}
      </Button>
    )
  }

  return (
    <Button
      className="bg-green-500 hover:bg-green-600 min-w-[85px]"
      onClick={handleApprove}
      aria-label={loading ? "aprovando anúncio..." : "aprovar anúncio?"}
    >
      {loading ? <BiLoader className="animate-spin" /> : "Aprovar"}
    </Button>
  )
}
