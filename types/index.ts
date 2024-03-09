import { Post, Image } from "@prisma/client"

export type SafePost = Omit<Post, "createdAt"> & {
  images: Image[]
  createdAt: string
}
