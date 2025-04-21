"use client"

import { PaginationSchema } from "@/schemas"
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "./ui/button"

export const Pagination = ({ hasNextPage }: { hasNextPage: boolean }) => {
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
    const updatedSearchParams = new URLSearchParams(params.toString())

    if (page > 1) {
      updatedSearchParams.set("page", String(page))
    } else {
      updatedSearchParams.delete("page")
    }

    router.push(pathname + "?" + updatedSearchParams.toString())
  }

  if (!hasNextPage && currentPage === 1) {
    return null
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
