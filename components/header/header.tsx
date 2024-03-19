import React from "react"
import { Navbar } from "./navbar"
import Image from "next/image"
import Link from "next/link"

const logo = process.env.NEXT_PUBLIC_LOGO
export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-violet-300 to-pink-400 shadow-md sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center">
        <Link aria-label="voltar ao inicio" href="/">
          {logo ? (
            <Image
              src={logo}
              width={258}
              height={105}
              alt="haven"
              className="w-[86px] h-[35px]"
            />
          ) : (
            <span className="font-bold text-white">Haven - Samonte</span>
          )}
        </Link>
        <Navbar />
      </div>
    </header>
  )
}
