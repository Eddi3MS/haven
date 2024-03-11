"use client"

import React from "react"
import { Button } from "./ui/button"
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { PaginationSchema, SearchParamsType } from "@/schemas"

export const Pagination = ({
  searchParams,
  hasNextPage,
}: {
  searchParams?: SearchParamsType
  hasNextPage: boolean
}) => {
  const params = useSearchParams()

  const page = params.get("page")

  const parsedPage = PaginationSchema.safeParse(page)

  let currentPage = 1

  if (parsedPage.success) {
    currentPage = +parsedPage.data
  }

  const router = useRouter()
  const pathname = usePathname()

  const handlePageChange = (page: number) => {
    let query: SearchParamsType = {
      ...(searchParams && searchParams),
    }

    if (page > 1) {
      query["page"] = String(page)
    } else {
      delete query["page"]
    }

    const queryParams = new URLSearchParams(query)

    router.push(pathname + "?" + queryParams.toString())
  }

  return (
    <div className="flex gap-2 justify-center py-4 fade-in">
      <Button
        disabled={currentPage === 1}
        onClick={handlePageChange.bind(null, currentPage - 1)}
        size="icon"
      >
        <ArrowLeftIcon />
      </Button>
      <Button variant="outline" size="icon" asChild>
        <span>{currentPage}</span>
      </Button>
      <Button
        onClick={handlePageChange.bind(null, currentPage + 1)}
        size="icon"
        disabled={!hasNextPage}
      >
        <ArrowRightIcon />
      </Button>
    </div>
  )
}
