"use client"
import { updatePostStatus } from "@/actions/posts/update-post-status"
import { useState } from "react"
import { BiLoader, BiX } from "react-icons/bi"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { deletePost } from "@/actions/posts/delete-post"
import { CheckIcon, Cross1Icon, TrashIcon } from "@radix-ui/react-icons"

export const ActionButton = ({
  postId,
  type,
  onActionSuccess,
}: {
  postId: string
  type: "APPROVE" | "REJECT" | "DELETE"
  onActionSuccess?: (postId: string) => void
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

    onActionSuccess?.(postId)
    return toast.success(res.success)
  }

  const handleDelete = async () => {
    const confirmation = prompt(
      "Deseja realmente deletar este anúncio? (digite 'sim')"
    )

    if (!confirmation || confirmation.toLocaleLowerCase() !== "sim") return

    setLoading(true)

    const res = await deletePost(postId)

    setLoading(false)

    if ("error" in res) {
      return toast.error(res.error)
    }

    onActionSuccess?.(postId)
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

    onActionSuccess?.(postId)
    return toast.success(res.success)
  }

  if (type === "DELETE") {
    return (
      <Button
        onClick={handleDelete}
        aria-label={loading ? "deletando anúncio..." : "deletar anúncio?"}
        size="icon"
        className="bg-red-500 hover:bg-red-600"
      >
        {loading ? (
          <BiLoader className="animate-spin" />
        ) : (
          <TrashIcon fontSize={24} />
        )}
      </Button>
    )
  }

  if (type === "REJECT") {
    return (
      <Button
        className="bg-red-500 hover:bg-red-600"
        onClick={handleReject}
        aria-label={loading ? "rejeitando anúncio..." : "rejeitar anúncio?"}
        size="icon"
      >
        {loading ? (
          <BiLoader className="animate-spin" />
        ) : (
          <Cross1Icon fontSize={20} />
        )}
      </Button>
    )
  }

  return (
    <Button
      className="bg-green-500 hover:bg-green-600"
      onClick={handleApprove}
      size="icon"
      aria-label={loading ? "aprovando anúncio..." : "aprovar anúncio?"}
    >
      {loading ? (
        <BiLoader className="animate-spin" />
      ) : (
        <CheckIcon fontSize={24} />
      )}
    </Button>
  )
}
