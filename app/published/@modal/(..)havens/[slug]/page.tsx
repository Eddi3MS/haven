"use client"
import { ImageCarousel } from "@/components/post/images-carousel"
import { DetailTooltip } from "@/components/post/detail-tooltip"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { usePublished } from "@/store/published"
import { categoriesTranslated } from "@/utils/categoryTranslation"
import { formatPhoneNumber, formatToCurrency } from "@/utils/format-inputs"
import { generateCloudinaryImageURL } from "@/utils/generateCloudinaryImageURL"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BiArea, BiBath, BiBed, BiHome } from "react-icons/bi"
import { useShallow } from "zustand/react/shallow"

const Page = ({ params: { slug } }: { params: { slug: string } }) => {
  const [open, setOpen] = useState(true)
  const router = useRouter()
  const data = usePublished(useShallow((state) => state.published))

  const post = data?.find((post) => post.id === slug)

  const handleClose = (isOpen: boolean) => {
    router.back()
    setOpen(isOpen)
  }

  if (!data || !post) {
    return <p>Anúncio Não Encontrado</p>
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="p-0 bg-transparent border-none w-[min(90%,500px)]">
        <Card className="w-full fade-in">
          <CardHeader>
            <div className="w-full mx-auto rounded-t-md overflow-hidden relative">
              <ImageCarousel
                images={post.images.map((image) =>
                  generateCloudinaryImageURL(image.publicId)
                )}
                single
              />
              <Badge className="absolute top-2 left-2" variant={post.category}>
                {categoriesTranslated[post.category]}
              </Badge>
              <Button
                type="button"
                variant="cta"
                className="absolute bottom-2 right-2"
                asChild
              >
                <span>{formatToCurrency(String(post.price))}</span>
              </Button>
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

          <CardFooter className="flex-col items-start gap-4">
            <div>
              <p>Anunciante: {post.user.name}</p>
              <p>Contato: {formatPhoneNumber(post.user.phone)}</p>
            </div>
            <div className="w-full flex justify-center">
              <Button onClick={handleClose.bind(null, false)}>Fechar</Button>
            </div>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

export default Page
