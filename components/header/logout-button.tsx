"use client"

import { logout } from "@/actions/logout"

interface LogoutButtonProps {
  children?: React.ReactNode
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = async () => {
    await logout()
  }

  return (
    <span onClick={onClick} role="button" aria-label="sair">
      {children}
    </span>
  )
}
