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
import { FaUser } from "react-icons/fa"

export const UserButton = ({
  image = "",
  isAdmin,
}: {
  image?: string
  isAdmin: boolean
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="abrir menu">
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <div className="block md:hidden">
          <DropdownMenuItem>
            <Link href="/havens">Imóveis</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/create">Anunciar</Link>
          </DropdownMenuItem>

          {isAdmin ? (
            <DropdownMenuItem>
              <Link href="/admin">Admin</Link>
            </DropdownMenuItem>
          ) : null}

          <DropdownMenuItem>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuItem>
          <Link href="/published">Publicados</Link>
        </DropdownMenuItem>

        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <ExitIcon className="h-4 w-4 mr-2" />
            Sair
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
