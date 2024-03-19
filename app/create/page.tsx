import CreatePostForm from "@/components/post/create-post-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Anuncie Aqui - Haven SA",
  description: "Anuncie seu imóvel com a gente.",
}

const CreatePost = () => {
  return <CreatePostForm />
}

export default CreatePost
