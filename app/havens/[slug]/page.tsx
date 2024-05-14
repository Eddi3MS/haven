import { listSinglePost } from "@/actions/posts/list-single-post"
import BackButton from "@/components/back-button"
import { DetailTooltip } from "@/components/post/detail-tooltip"
import { ImageCarousel } from "@/components/post/images-carousel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { categoriesTranslated } from "@/utils/categoryTranslation"
import { formatPhoneNumber, formatToCurrency } from "@/utils/format-inputs"
import { generateCloudinaryImageURL } from "@/utils/generateCloudinaryImageURL"
import { Metadata } from "next"
import Link from "next/link"
import { BiArea, BiBath, BiBed, BiHome } from "react-icons/bi"

type Props = {
  params: { slug: string }
}

const SingleHaven = async ({ params: { slug } }: Props) => {
  const post = await listSinglePost(slug)

  if (!post) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center w-full fade-in gap-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Erro.</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-left">
              Anuncio não encontrado ou ainda não foi aprovado para
              visualização.
            </p>
          </CardContent>

          <CardFooter>
            <Button asChild>
              <Link href="/havens">Voltar para anúncios</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-between w-full py-4 fade-in">
        <div className="flex gap-2 items-center ">
          <BackButton />
          <h1 className="text-2xl font-semibold  line-clamp-1 text-left">
            {post.title}
          </h1>
        </div>
        <Badge variant={post.category}>
          {categoriesTranslated[post.category]}
        </Badge>
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
        <CardContent className="space-y-2 pt-0 md:pt-0">
          <div>
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-muted-foreground text-sm">
              {post.address}, {post.number} - {post.district}
            </p>
          </div>

          <div className="flex max-w-md gap-2">
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
          <p className="pb-2">{post.description}</p>

          <hr />

          <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
            <p className="flex flex-col justify-between">
              <span className="text-lg">Preço </span>
              <span className="text-lg font-bold">
                {formatToCurrency(String(post.price))}
              </span>
            </p>
            <hr className="md:hidden" />

            <div className="flex-col items-stretch min-w-[250px]">
              <p className="flex justify-between text-lg">
                <span>Anunciante: </span> <span>{post.user.name}</span>
              </p>
              <p className="flex justify-between text-lg">
                <span>Contato: </span>
                <span>{formatPhoneNumber(post.user.phone)}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default SingleHaven
