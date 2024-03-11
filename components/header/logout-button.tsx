"use client"

import { logout } from "@/actions/auth/logout"
import { useRouter } from "next/navigation"

interface LogoutButtonProps {
  children?: React.ReactNode
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter()
  const onClick = async () => {
    await logout()
    router.refresh()
  }

  return (
    <span onClick={onClick} role="button" aria-label="sair">
      {children}
    </span>
  )
}
