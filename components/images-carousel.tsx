"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export const ImageCarousel = ({ images }: { images: string[] }) => {
  return (
    <Carousel opts={{ slidesToScroll: "auto" }}>
      <CarouselPrevious />
      <CarouselContent className="">
        {images.map((image, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Image
              src={image}
              width={300}
              height={200}
              alt="image"
              className="aspect-video w-full max-w-full"
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselNext />
    </Carousel>
  )
}
