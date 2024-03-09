"use client"
import { updatePostStatus } from "@/actions/posts/update-post-status"
import React, { useState } from "react"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { BiLoader } from "react-icons/bi"
import { useRouter } from "next/navigation"

export const RejectButton = ({ postId }: { postId: string }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

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

    router.refresh()
    return toast.success(res.success)
  }

  return (
    <Button
      className="bg-red-500 hover:bg-red-600 min-w-[85px]"
      onClick={handleReject}
    >
      {loading ? <BiLoader className="animate-spin" /> : "Rejeitar"}
    </Button>
  )
}
