import { listPostsPending } from "@/actions/posts/list-posts-pending"
import { DetailTooltip } from "@/components/post/detail-tooltip"
import { ImageCarousel } from "@/components/images-carousel"
import { ApproveButton } from "@/components/post/ApprovePost"
import { RejectButton } from "@/components/post/RejectButton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { generateCloudinaryImageURL } from "@/utils/generateCloudinaryImageURL"
import { BiArea, BiBath, BiBed, BiHome } from "react-icons/bi"
import { DeletePostById } from "@/components/post/DeletePostById"
import { Badge } from "@/components/ui/badge"
import { categoriesTranslated } from "@/utils/categoryTranslation"
import { formatToCurrency } from "@/utils/format-inputs"

const AdminPage = async () => {
  const data = await listPostsPending()

  return (
    <>
      <div className="flex justify-between w-full py-4">
        <h1 className="text-2xl font-semibold text-center">
          Pendentes de Aprovação:
        </h1>

        <DeletePostById />
      </div>
      <div className="grid gap-4">
        {data.map((post) => (
          <Card className="w-full flex-1" key={post.id}>
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
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Badge className="bg-gray-900 hover:bg-gray-800">
                    {categoriesTranslated[post.category]}
                  </Badge>
                  <h2 className="text-lg font-semibold flex gap-2 items-center">
                    {post.title}
                  </h2>
                </div>
                <span className="justify-self-end">
                  {formatToCurrency(String(post.price))}
                </span>
              </div>

              <p className="text-muted-foreground text-sm">{post.address}</p>
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

            <CardFooter className="flex justify-between">
              <div>
                <p>Anunciante: {post.user.name}</p>
                <p>Email: {post.user.email}</p>
              </div>
              <div className="flex gap-4">
                <RejectButton postId={post.id} />
                <ApproveButton postId={post.id} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

export default AdminPage
