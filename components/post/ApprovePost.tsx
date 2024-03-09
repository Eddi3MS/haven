"use client"
import { updatePostStatus } from "@/actions/posts/update-post-status"
import { useState } from "react"
import { BiLoader } from "react-icons/bi"
import { toast } from "sonner"
import { Button } from "../ui/button"

export const ApproveButton = ({ postId }: { postId: string }) => {
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

    return toast.success(res.success)
  }

  return (
    <Button
      className="bg-green-500 hover:bg-green-600 min-w-[85px]"
      onClick={handleApprove}
    >
      {loading ? <BiLoader className="animate-spin" /> : "Aprovar"}
    </Button>
  )
}
