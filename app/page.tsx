import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import img1 from "@/assets/1.jpg"
import img2 from "@/assets/2.jpg"
import img3 from "@/assets/3.jpg"
import img4 from "@/assets/4.jpg"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  preload: true,
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
})

export default function Home() {
  return (
    <div className="w-full flex-1 flex flex-col gap-4 max-w-[min(1400px,98%)] px-4">
      <div className="flex flex-col items-center justify-center flex-grow-[2]">
        <h1
          className={`text-[clamp(2.5rem,5vw,80px)] leading-[clamp(3rem,5vw,80px)]
          bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text text-transparent 
           ${poppins.className}
           mb-4`}
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-[min(1400px,98%)] mx-auto pb-4 flex-grow-[1]">
        <Image
          src={img1.src}
          alt="illustration 1"
          width={300}
          height={200}
          className="rounded-md shadow-lg shadow-violet-300 md:self-start hidden md:block"
        />
        <Image
          src={img2.src}
          alt="illustration 1"
          width={300}
          height={200}
          className="rounded-md shadow-lg shadow-pink-300 md:self-center hidden md:block"
        />
        <Image
          src={img3.src}
          alt="illustration 1"
          width={300}
          height={200}
          className="rounded-md shadow-lg shadow-violet-300 md:self-start hidden md:block"
        />
        <Image
          src={img4.src}
          alt="illustration 1"
          width={300}
          height={200}
          className="rounded-md shadow-lg shadow-pink-300 md:self-center"
        />
      </div>
    </div>
  )
}
