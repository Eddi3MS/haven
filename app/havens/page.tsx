import { listPosts } from "@/actions/posts/list-posts"
import { Filters } from "@/components/post/filter"
import PostsList from "@/components/post/posts-list"
import { UrlSearchParamsType } from "@/schemas"
import { generateCloudinaryImageURL } from "@/utils/generateCloudinaryImageURL"
import { Metadata } from "next"

export async function generateMetadata({
  searchParams,
}: {
  searchParams: UrlSearchParamsType
}): Promise<Metadata> {
  const { data } = await listPosts(searchParams)

  if (!Array.isArray(data) || data.length === 0)
    return {
      title: "Imóveis - Haven SA",
      description: "Nenhum imóvel encontrado.",
    }

  const image = generateCloudinaryImageURL(data[0].images[0].publicId)

  return {
    title: "Imóveis - Haven SA",
    description: "O imóvel dos seus sonhos esta aqui.",
    twitter: {
      images: [image],
    },
    openGraph: {
      images: [image],
    },
  }
}

const Havens = async ({
  searchParams,
}: {
  searchParams: UrlSearchParamsType
}) => {
  const data = await listPosts(searchParams)

  return (
    <>
      <div className="flex justify-between w-full py-4 fade-in">
        <h1 className="text-2xl font-semibold text-center">Imóveis</h1>

        <Filters searchParams={searchParams} />
      </div>

      <PostsList posts={data.data} hasNextPage={data.hasNextPage} />
    </>
  )
}

export default Havens
