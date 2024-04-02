"use client"

import { usePublished } from "@/store/published"
import { SafePostWithUser } from "@/types"

const PublishedStore = ({
  published,
}: {
  published: SafePostWithUser[] | null
}) => {
  usePublished.setState({
    published,
  })

  return null
}

export default PublishedStore
