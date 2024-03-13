import { Post, Image } from "@prisma/client"

export type SafePost = Omit<Post, "createdAt"> & {
  images: Image[]
  createdAt: string
}

export type SafePostWithUser = SafePost & {
  user: {
    name: string
    email: string
    phone: string
  }
}
