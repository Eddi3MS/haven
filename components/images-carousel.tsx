import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image"

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div>
      <Carousel setApi={setApi} className="w-full max-w-sm">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="py-10">
              <div
                className="m-2 min-w-[300px] min-h-[200px] bg-cover bg-center"
                style={{ backgroundImage: `URL(${image})` }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {api?.canScrollPrev() && (
          <CarouselPrevious className="hidden md:flex" />
        )}
        {api?.canScrollNext() && <CarouselNext className="hidden md:flex" />}
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Imagem {current} de {count}.
      </div>
    </div>
  )
}

export default ImageCarousel
