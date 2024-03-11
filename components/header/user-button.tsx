"use client"

import { LogoutButton } from "@/components/header/logout-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ExitIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { useState } from "react"
import { FaUser } from "react-icons/fa"

export const UserButton = ({
  image = "",
  isAdmin,
}: {
  image?: string
  isAdmin: boolean
}) => {
  const [open, setOpen] = useState(false)
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger aria-label="abrir menu">
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20" align="end">
        <div className="block md:hidden">
          <DropdownMenuItem onClick={() => setOpen(false)}>
            <Link href="/havens" className="w-full">
              Imóveis
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(false)}>
            <Link href="/create" className="w-full">
              Anunciar
            </Link>
          </DropdownMenuItem>

          {isAdmin ? (
            <DropdownMenuItem onClick={() => setOpen(false)}>
              <Link href="/admin" className="w-full">
                Admin
              </Link>
            </DropdownMenuItem>
          ) : null}

          <DropdownMenuItem onClick={() => setOpen(false)}>
            <Link href="/settings" className="w-full">
              Settings
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuItem onClick={() => setOpen(false)}>
          <Link href="/published" className="w-full">
            Publicados
          </Link>
        </DropdownMenuItem>

        <LogoutButton>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <ExitIcon className="h-4 w-4 mr-2" />
            Sair
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
