"use client"

import { LogoutButton } from "@/components/header/logout-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ExitIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { LoginButton } from "./login-button"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

export const MenuMobile = ({
  image = "",
  isAdmin,
  hasUser,
}: {
  image?: string
  isAdmin: boolean
  hasUser: boolean
}) => {
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger aria-label="abrir menu">
        {hasUser ? (
          <Avatar>
            <AvatarImage src={image} />
            <AvatarFallback className="bg-sky-500">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
        ) : (
          <HamburgerMenuIcon fontSize={40} fontWeight={700} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn("w-20", !hasUser ? "text-center" : "")}
        align="end"
        onClick={handleClose}
      >
        <div className="block md:hidden">
          {!hasUser && (
            <LoginButton asChild>
              <Button variant="cta" size="lg" className="w-full">
                Entrar
              </Button>
            </LoginButton>
          )}
          <DropdownMenuItem>
            <Link href="/havens" className="w-full">
              Imóveis
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/create" className="w-full">
              Anunciar
            </Link>
          </DropdownMenuItem>

          {isAdmin ? (
            <DropdownMenuItem>
              <Link href="/admin" className="w-full">
                Admin
              </Link>
            </DropdownMenuItem>
          ) : null}

          {hasUser && (
            <DropdownMenuItem>
              <Link href="/settings" className="w-full">
                Configurações
              </Link>
            </DropdownMenuItem>
          )}
        </div>

        {hasUser && (
          <>
            <DropdownMenuItem>
              <Link href="/published" className="w-full">
                Meus anúncios
              </Link>
            </DropdownMenuItem>

            <LogoutButton>
              <DropdownMenuItem className="cursor-pointer">
                <ExitIcon className="h-4 w-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </LogoutButton>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
