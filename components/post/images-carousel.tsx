"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import Image from "next/image"

export const ImageCarousel = ({
  images,
  single = false,
}: {
  images: string[]
  single?: boolean
}) => {
  return (
    <Carousel opts={{ slidesToScroll: "auto" }}>
      <CarouselPrevious />
      <CarouselContent className="">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className={cn(
              "md:basis-1/2 lg:basis-1/3",
              single && "lg:basis-full"
            )}
          >
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
