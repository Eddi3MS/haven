import React from "react"
import { Navbar } from "./navbar"
import Image from "next/image"
import Link from "next/link"

const logo = process.env.NEXT_PUBLIC_LOGO
export const Header = () => {
  return (
    <header
      className="bg-gradient-to-r from-blue-800 to-blue-500 text-white
 shadow-md sticky top-0 z-20"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link aria-label="voltar ao inicio" href="/">
          {logo ? (
            <Image
              src={logo}
              width={368}
              height={90}
              alt="haven"
              className="w-[92px] h-[22.5px]"
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
