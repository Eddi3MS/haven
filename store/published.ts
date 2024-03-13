import { SafePostWithUser } from "@/types"
import { create } from "zustand"

export const usePublished = create<{ published: SafePostWithUser[] | null }>(
  () => ({
    published: null,
  })
)
