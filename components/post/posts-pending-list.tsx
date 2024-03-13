"use client"
import { SafePost } from "@/types"
import { categoriesTranslated } from "@/utils/categoryTranslation"
import { formatPhoneNumber, formatToCurrency } from "@/utils/format-inputs"
import { generateCloudinaryImageURL } from "@/utils/generateCloudinaryImageURL"
import { useState } from "react"
import { BiArea, BiBath, BiBed, BiHome } from "react-icons/bi"
import { ImageCarousel } from "../images-carousel"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { ActionButton } from "./action-button"
import { DetailTooltip } from "./detail-tooltip"

export const PostsPendingList = ({
  data,
}: {
  data: (SafePost & { user: { name: string; email: string; phone: string } })[]
}) => {
  const [clientData, setClientData] = useState(data)

  const onActionSuccess = (id: string) => {
    setClientData((curr) => curr.filter((post) => post.id !== id))
  }

  return (
    <div className="grid gap-4">
      {clientData && clientData.length > 0 ? (
        clientData.map((post) => (
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

            <CardFooter className="flex justify-between flex-col md:flex-row gap-4">
              <div>
                <p>Anunciante: {post.user.name}</p>
                <p>Email: {post.user.email}</p>
                <p>Contato: {formatPhoneNumber(post.user.phone)}</p>
              </div>
              <div className="flex gap-4">
                <ActionButton
                  onActionSuccess={onActionSuccess}
                  postId={post.id}
                  type="DELETE"
                />
                <ActionButton
                  onActionSuccess={onActionSuccess}
                  postId={post.id}
                  type="REJECT"
                />
                <ActionButton
                  onActionSuccess={onActionSuccess}
                  postId={post.id}
                  type="APPROVE"
                />
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p className="text-center">Nenhum anuncio pendente de aprovação.</p>
      )}
    </div>
  )
}
