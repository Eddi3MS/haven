import bg from "@/assets/bg.webp"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main
      className="flex h-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="p-8 md:p-20 rounded-md grid gap-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300 max-w-[min(500px,94%)]">
        <h1>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/haven-imoveis-74ece.appspot.com/o/nm_haven_light.png?alt=media"
            width={368}
            height={117}
            alt="Haven"
          />
        </h1>

        <h2 className="text-center text-lg md:text-xl font-bold text-[#202023]">
          Encontre a casa dos seus sonhos <br />{" "}
          <span className="text-sm md:text-lg underline underline-offset-4">
            pra comprar ou alugar
          </span>
        </h2>

        <Button size="lg" asChild>
          <Link href="/havens">Ver Imóveis</Link>
        </Button>
      </div>
    </main>
  )
}
