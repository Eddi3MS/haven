import { listSinglePost } from "@/actions/posts/list-single-post"
import { DetailTooltip } from "@/components/post/detail-tooltip"
import { ImageCarousel } from "@/components/post/images-carousel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { categoriesTranslated } from "@/utils/categoryTranslation"
import { formatPhoneNumber, formatToCurrency } from "@/utils/format-inputs"
import { generateCloudinaryImageURL } from "@/utils/generateCloudinaryImageURL"
import { Metadata } from "next"
import { BiArea, BiBath, BiBed, BiHome } from "react-icons/bi"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const id = params.slug

  const post = await listSinglePost(id)

  return {
    title: post?.title,
    description: post?.description,
  }
}

const SingleHaven = async ({
  params: { slug },
}: {
  params: { slug: string }
}) => {
  const post = await listSinglePost(slug)

  if (!post) {
    return "haven not found."
  }

  return (
    <>
      <div className="flex justify-between w-full py-4 fade-in">
        <div className="flex gap-2 items-center ">
          <Badge variant={post.category}>
            {categoriesTranslated[post.category]}
          </Badge>
          <h1 className="text-2xl font-semibold  line-clamp-1 text-left">
            {post.title}
          </h1>
        </div>

        <Button type="button" variant="cta">
          {formatToCurrency(String(post.price))}
        </Button>
      </div>

      <Card className="w-full fade-in">
        <CardHeader>
          <div className="w-full mx-auto rounded-t-md overflow-hidden">
            <ImageCarousel
              images={post.images.map((image) =>
                generateCloudinaryImageURL(image.publicId)
              )}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-muted-foreground text-sm">{post.address}</p>
          </div>
          <p>{post.description}</p>

          <div className="flex w-full justify-between">
            <DetailTooltip text="Quartos">
              <BiBed fontSize={16} />
              {post.bedroomCount}
            </DetailTooltip>
            <DetailTooltip text="Banheiros">
              <BiBath fontSize={16} />
              {post.bathroomCount}
            </DetailTooltip>
            <DetailTooltip text="Área Total">
              <BiArea fontSize={16} />
              {post.area}m²
            </DetailTooltip>
            <DetailTooltip text="Área Construída">
              <BiHome fontSize={16} />
              {post.builtArea}m²
            </DetailTooltip>
          </div>
        </CardContent>

        <CardFooter className="">
          <div>
            <p>Anunciante: {post.user.name}</p>
            <p>Contato: {formatPhoneNumber(post.user.phone)}</p>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export default SingleHaven
