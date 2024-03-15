import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import img1 from "@/assets/1.jpg"
import img2 from "@/assets/2.jpg"
import img3 from "@/assets/3.jpg"
import img4 from "@/assets/4.jpg"
import { poppins } from "@/app/fonts/fonts"
import { ImageCarousel } from "@/components/post/images-carousel"

export default function Home() {
  return (
    <div className="w-full flex-1 flex flex-col gap-4 container px-4">
      <div className="flex flex-col items-center justify-center flex-grow-[.5] md:flex-grow-[2]">
        <h1
          className={`text-[clamp(2.2rem,5vw,80px)] leading-[clamp(3rem,5vw,80px)]
          bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text text-transparent 
           ${poppins.className}
           mb-4 text-center md:text-left`}
        >
          Encontre a casa <br />
          dos seus sonhos
        </h1>
        <h2
          className={`text-[clamp(1rem,5vw,1.5rem)] leading-[clamp(1.2rem,5vw,1.8rem)] text-muted-foreground mb-8 ${poppins.className}`}
        >
          pra comprar ou alugar
        </h2>

        <Button size="xl" variant="cta" asChild>
          <Link href="/havens">Ver Imóveis</Link>
        </Button>
      </div>
      <div className="grid-cols-1 md:grid-cols-4 gap-4 pb-4 flex-grow-[1] hidden md:grid">
        <Image
          src={img1.src}
          alt="illustration 1"
          width={300}
          height={200}
          className="rounded-md shadow-md shadow-violet-300 md:self-start"
        />
        <Image
          src={img2.src}
          alt="illustration 1"
          width={300}
          height={200}
          className="rounded-md shadow-md shadow-pink-300 md:self-center"
        />
        <Image
          src={img3.src}
          alt="illustration 1"
          width={300}
          height={200}
          className="rounded-md shadow-md shadow-violet-300 md:self-start"
        />
        <Image
          src={img4.src}
          alt="illustration 1"
          width={300}
          height={200}
          className="rounded-md shadow-md shadow-pink-300 md:self-center"
        />
      </div>

      <div className="md:hidden block flex-grow-[1]">
        <ImageCarousel
          images={[img1.src, img2.src, img3.src, img4.src].map(
            (image) => image
          )}
        />
      </div>
    </div>
  )
}
