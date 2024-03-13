import { listPostsByUser } from "@/actions/posts/list-by-user"
import PublishedStore from "@/components/published-store"
import React from "react"

const Layout = async ({
  children,
  modal,
  searchParams,
}: {
  children: React.ReactNode
  modal: React.ReactNode
  searchParams: { page?: string }
}) => {
  const data = await listPostsByUser(searchParams)

  return (
    <PublishedStore published={data.data}>
      {children}
      {modal}
    </PublishedStore>
  )
}

export default Layout
