import { FilterPostSchema } from "@/schemas"
import React from "react"
import { z } from "zod"
import { Filters } from "./_components/filter"

export type SearchParamsType = z.infer<typeof FilterPostSchema>

const Havens = ({ searchParams }: { searchParams: SearchParamsType }) => {
  return (
    <>
      <Filters searchParams={searchParams} />
      <div className="flex-1"></div>
    </>
  )
}

export default Havens
