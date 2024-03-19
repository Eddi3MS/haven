"use client"

import { usePublished } from "@/store/published"
import { SafePostWithUser } from "@/types"
import React from "react"

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
