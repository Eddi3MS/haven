"use client"

import { logout } from "@/actions/auth/logout"
import { useSession } from "next-auth/react"

import { useRouter } from "next/navigation"

interface LogoutButtonProps {
  children?: React.ReactNode
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter()
  const { update } = useSession()
  const onClick = async () => {
    await logout()
    update()

    router.refresh()
  }

  return (
    <span onClick={onClick} role="button" aria-label="sair">
      {children}
    </span>
  )
}
