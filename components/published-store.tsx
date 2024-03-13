"use client"

import { usePublished } from "@/store/published"
import { SafePostWithUser } from "@/types"
import React from "react"

const PublishedStore = ({
  published,
  children,
}: {
  children: React.ReactNode
  published: SafePostWithUser[] | null
}) => {
  usePublished.setState({
    published,
  })

  return children
}

export default PublishedStore
