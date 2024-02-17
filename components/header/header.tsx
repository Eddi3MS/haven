import React from "react"
import { Navbar } from "./navbar"
import Image from "next/image"
import Link from "next/link"

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-violet-300 to-pink-400 shadow-md">
      <div className="max-w-[min(1400px,98%)] mx-auto flex justify-between items-center">
        <Link aria-label="voltar ao inicio" href="/">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/haven-imoveis-74ece.appspot.com/o/nm_haven_light.png?alt=media"
            width={368}
            height={90}
            alt="haven"
            className="w-[92px] h-[22.5px]"
          />
        </Link>
        <Navbar />
      </div>
    </header>
  )
}
